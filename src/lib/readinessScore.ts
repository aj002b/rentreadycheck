export type CosignerOption = "No" | "Yes" | "Not sure";
export type RoommateOption = "No" | "Yes" | "Not sure";
export type CreditConfidence =
  | "Strong"
  | "Average"
  | "Limited or rebuilding"
  | "Prefer not to say";
export type MoveInTimeframe =
  | "This month"
  | "1–3 months"
  | "3+ months"
  | "Just exploring";

export type ReadinessScoreInput = {
  monthlyRent: number;
  annualIncome: number;
  savings: number;
  monthlyDebt: number;
  cosigner: CosignerOption;
  roommate: RoommateOption;
  creditConfidence: CreditConfidence;
  moveInTimeframe: MoveInTimeframe;
};

export type ReadinessCategoryKey =
  | "income"
  | "savings"
  | "debt"
  | "support"
  | "flexibility";

export type ReadinessCategoryScores = {
  income: {
    points: number;
    max: 40;
    note: string;
  };
  savings: {
    points: number;
    max: 25;
    note: string;
  };
  debt: {
    points: number;
    max: 15;
    note: string;
  };
  support: {
    points: number;
    max: 10;
    note: string;
  };
  flexibility: {
    points: number;
    max: 10;
    note: string;
  };
};

export type ReadinessScoreResult = {
  score: number;
  totalScore: number;
  label: string;
  scoreLabel: string;
  rentTwin: {
    title: string;
    explanation: string;
  };
  rentTwinDescription: string;
  topNextStep: string;
  supportingActions: string[];
  strengths: string[];
  watchOuts: string[];
  grossMonthlyIncome: number;
  rentMultiple: number;
  rentToIncomePercent: number;
  estimatedMoveInNeed: number;
  savingsGap: number;
  savingsSurplus: number;
  debtRatio: number;
  suggestedRentTarget: number;
  weakestCategory: ReadinessCategoryKey;
  categories: ReadinessCategoryScores;
  categoryScores: ReadinessCategoryScores;
  keyNumbers: {
    grossMonthlyIncome: number;
    rentMultiple: number;
    rentToIncomePercent: number;
    estimatedMoveInNeed: number;
    savingsGap: number;
    savingsSurplus: number;
    debtRatio: number;
  };
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const roundToHundred = (value: number) => Math.ceil(value / 100) * 100;

function safeNonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function getReadinessLabel(score: number) {
  if (score >= 85) return "Rent Ready";
  if (score >= 70) return "Nearly There";
  if (score >= 50) return "Needs Preparation";
  return "High Support Needed";
}

function getWeakestCategory(result: {
  income: number;
  savings: number;
  debt: number;
  support: number;
  flexibility: number;
}): ReadinessCategoryKey {
  const normalized = [
    ["income", result.income / 40],
    ["savings", result.savings / 25],
    ["debt", result.debt / 15],
    ["support", result.support / 10],
    ["flexibility", result.flexibility / 10],
  ] as const;

  return normalized.reduce((weakest, current) =>
    current[1] < weakest[1] ? current : weakest,
  )[0];
}

function getRentTwin(
  input: ReadinessScoreInput,
  score: number,
  weakestCategory: ReadinessCategoryKey,
  rentMultiple: number,
) {
  if (score >= 85 && weakestCategory !== "income" && weakestCategory !== "savings") {
    return {
      title: "Prepared Renter",
      explanation:
        "Your estimate shows a strong mix of income, savings, and application readiness for the apartment target.",
    };
  }

  if (input.cosigner === "Yes" && score >= 60) {
    return {
      title: "Co-signer Supported Renter",
      explanation:
        "Co-signer support may add strength while you compare rent targets, savings, and timing.",
    };
  }

  if (rentMultiple < 2 || weakestCategory === "income") {
    return {
      title: "High Rent Pressure Renter",
      explanation:
        "Your target rent may be high compared with income, so a lower rent target or roommate option could improve the estimate.",
    };
  }

  if (weakestCategory === "savings") {
    return {
      title: "Savings Builder",
      explanation:
        "Your main opportunity is building a larger move-in buffer before submitting rental applications.",
    };
  }

  if (
    input.moveInTimeframe === "Just exploring" ||
    input.creditConfidence === "Limited or rebuilding"
  ) {
    return {
      title: "First-Time Planner",
      explanation:
        "You are in a planning stage, so comparing targets and preparing documents can make the next step easier.",
    };
  }

  if (score >= 70) {
    return {
      title: "Nearly There Renter",
      explanation:
        "You look close, but strengthening savings or adjusting your target rent could improve the estimate.",
    };
  }

  return {
    title: "First-Time Planner",
    explanation:
      "A few preparation steps could improve your position before you choose where to apply.",
  };
}

type NextStepCategory = "income" | "savings" | "debt" | "none";

// The next step targets a real shortfall in income, savings or debt. Support
// and flexibility are left out: answering "No" to a co-signer scores 0 there,
// which would otherwise make "ask about a co-signer" the advice for everyone.
function getNextStepCategory(points: {
  income: number;
  savings: number;
  debt: number;
}): NextStepCategory {
  const shortfalls = (
    [
      ["income", points.income / 40],
      ["savings", points.savings / 25],
      ["debt", points.debt / 15],
    ] as const
  ).filter(([, share]) => share < 1);

  if (shortfalls.length === 0) {
    return "none";
  }

  return shortfalls.reduce((weakest, current) =>
    current[1] < weakest[1] ? current : weakest,
  )[0];
}

function getNextSteps(
  category: NextStepCategory,
  savingsGap: number,
  suggestedRentTarget: number,
) {
  if (category === "savings" && savingsGap > 0) {
    return {
      topNextStep: `Save $${roundToHundred(savingsGap).toLocaleString()} more before applying.`,
      supportingActions: [
        "Use the Move-In Cost Calculator.",
        "Compare a $100 lower rent target.",
        "Prepare proof of income and ID documents.",
      ],
    };
  }

  if (category === "income") {
    return {
      topNextStep: `Consider apartments closer to $${suggestedRentTarget.toLocaleString()}/month.`,
      supportingActions: [
        "Compare the target with a roommate option.",
        "Ask the property manager whether they accept a co-signer.",
        "Use the Rent Affordability Calculator.",
      ],
    };
  }

  if (category === "debt") {
    return {
      topNextStep: "Reduce monthly debt pressure where possible.",
      supportingActions: [
        "Keep move-in savings separate from monthly bills.",
        "Compare a lower monthly rent target.",
        "Prepare a simple budget before applying.",
      ],
    };
  }

  return {
    topNextStep: "Gather your application documents before applying.",
    supportingActions: [
      "Prepare proof of income and ID documents.",
      "Ask the property manager about application requirements.",
      "Compare a few apartments before choosing.",
    ],
  };
}

export function calculateReadinessScore(
  input: ReadinessScoreInput,
): ReadinessScoreResult {
  const monthlyRent = safeNonNegative(input.monthlyRent);
  const annualIncome = safeNonNegative(input.annualIncome);
  const savings = safeNonNegative(input.savings);
  const monthlyDebt = safeNonNegative(input.monthlyDebt);

  const grossMonthlyIncome = annualIncome > 0 ? annualIncome / 12 : 0;
  const rentMultiple =
    monthlyRent > 0 && grossMonthlyIncome > 0
      ? grossMonthlyIncome / monthlyRent
      : 0;
  const rentToIncomePercent =
    grossMonthlyIncome > 0 && monthlyRent > 0 ? monthlyRent / grossMonthlyIncome : 0;
  const estimatedMoveInNeed = monthlyRent * 3;
  const savingsGap = Math.max(estimatedMoveInNeed - savings, 0);
  const savingsSurplus = Math.max(savings - estimatedMoveInNeed, 0);
  const debtRatio =
    grossMonthlyIncome > 0 ? monthlyDebt / grossMonthlyIncome : 1;

  let incomePoints = 5;
  if (rentMultiple >= 3) incomePoints = 40;
  else if (rentMultiple >= 2.5) incomePoints = 32;
  else if (rentMultiple >= 2) incomePoints = 22;
  else if (rentMultiple >= 1.5) incomePoints = 12;

  let savingsPoints = 4;
  if (monthlyRent <= 0) savingsPoints = 4;
  else if (savings >= estimatedMoveInNeed) savingsPoints = 25;
  else if (savings >= monthlyRent * 2) savingsPoints = 18;
  else if (savings >= monthlyRent) savingsPoints = 10;

  let debtPoints = 3;
  if (debtRatio <= 0.1) debtPoints = 15;
  else if (debtRatio <= 0.2) debtPoints = 11;
  else if (debtRatio <= 0.3) debtPoints = 7;

  const supportPoints =
    input.cosigner === "Yes" ? 10 : input.cosigner === "Not sure" ? 5 : 0;

  const roommatePoints =
    input.roommate === "Yes" ? 4 : input.roommate === "Not sure" ? 2 : 0;
  const creditPoints =
    input.creditConfidence === "Strong"
      ? 4
      : input.creditConfidence === "Average"
        ? 2
        : input.creditConfidence === "Prefer not to say"
          ? 1
          : 0;
  const timeframePoints =
    input.moveInTimeframe === "3+ months" ||
    input.moveInTimeframe === "Just exploring"
      ? 2
      : input.moveInTimeframe === "1–3 months"
        ? 1
        : 0;
  const flexibilityPoints = roommatePoints + creditPoints + timeframePoints;

  const score = clamp(
    incomePoints +
      savingsPoints +
      debtPoints +
      supportPoints +
      flexibilityPoints,
    0,
    100,
  );

  const weakestCategory = getWeakestCategory({
    income: incomePoints,
    savings: savingsPoints,
    debt: debtPoints,
    support: supportPoints,
    flexibility: flexibilityPoints,
  });
  const suggestedRentTarget = Math.max(
    0,
    Math.floor((grossMonthlyIncome / 3) / 50) * 50,
  );
  const { topNextStep, supportingActions } = getNextSteps(
    getNextStepCategory({
      income: incomePoints,
      savings: savingsPoints,
      debt: debtPoints,
    }),
    savingsGap,
    suggestedRentTarget,
  );

  const strengths = [
    rentMultiple >= 2.5
      ? "Income looks close to common 2.5x or 3x rent examples."
      : null,
    monthlyRent > 0 && savings >= monthlyRent * 2
      ? "Savings may cover a basic move-in buffer."
      : null,
    debtRatio <= 0.2 ? "Monthly debt looks manageable." : null,
    input.cosigner === "Yes"
      ? "Co-signer support may strengthen your application."
      : null,
    input.roommate === "Yes"
      ? "Renting with a roommate may improve flexibility."
      : null,
    input.creditConfidence === "Strong"
      ? "Credit confidence looks like a positive application signal."
      : null,
  ].filter(Boolean) as string[];

  const watchOuts = [
    rentMultiple < 2.5 ? "Rent may be high compared with income." : null,
    monthlyRent > 0 && savings < estimatedMoveInNeed
      ? "Savings buffer could be stronger."
      : null,
    debtRatio > 0.2 ? "Monthly debt may reduce flexibility." : null,
    input.creditConfidence === "Limited or rebuilding"
      ? "Some apartments may ask for stronger credit or a co-signer."
      : null,
    input.moveInTimeframe === "This month"
      ? "Moving this month may leave less time to prepare documents and funds."
      : null,
  ].filter(Boolean) as string[];

  const safeStrengths =
    strengths.length > 0
      ? strengths.slice(0, 4)
      : ["You have a clear apartment target to compare before applying."];
  const safeWatchOuts =
    watchOuts.length > 0
      ? watchOuts.slice(0, 4)
      : ["Rental decisions can still vary by landlord and property manager rules."];

  const categories = {
    income: {
      points: incomePoints,
      max: 40,
      note:
        rentMultiple >= 3
          ? "Income is at or above a common 3x rent example."
          : "Compare this rent with common 2.5x and 3x income examples.",
    },
    savings: {
      points: savingsPoints,
      max: 25,
      note:
        savingsGap > 0
          ? "A larger move-in buffer could improve this category."
          : "Savings may cover the estimated move-in buffer.",
    },
    debt: {
      points: debtPoints,
      max: 15,
      note:
        debtRatio <= 0.2
          ? "Debt payments look manageable compared with income."
          : "Debt payments may reduce monthly flexibility.",
    },
    support: {
      points: supportPoints,
      max: 10,
      note:
        input.cosigner === "Yes"
          ? "Co-signer support is included in this estimate."
          : "This estimate does not include confirmed co-signer support.",
    },
    flexibility: {
      points: flexibilityPoints,
      max: 10,
      note:
        "Roommate choice, credit confidence, and timing shape this category.",
    },
  } satisfies ReadinessCategoryScores;

  const label = getReadinessLabel(score);
  const rentTwin = getRentTwin(input, score, weakestCategory, rentMultiple);
  const keyNumbers = {
    grossMonthlyIncome,
    rentMultiple,
    rentToIncomePercent,
    estimatedMoveInNeed,
    savingsGap,
    savingsSurplus,
    debtRatio,
  };

  return {
    score,
    totalScore: score,
    label,
    scoreLabel: label,
    rentTwin,
    rentTwinDescription: rentTwin.explanation,
    topNextStep,
    supportingActions,
    strengths: safeStrengths,
    watchOuts: safeWatchOuts,
    grossMonthlyIncome,
    rentMultiple,
    rentToIncomePercent,
    estimatedMoveInNeed,
    savingsGap,
    savingsSurplus,
    debtRatio,
    suggestedRentTarget,
    weakestCategory,
    categories,
    categoryScores: categories,
    keyNumbers,
  };
}

// Answers assumed for the questions the short homepage form doesn't ask. The
// full assessment starts from these same values, so both show the same score
// for the same rent, income, savings, debt and co-signer answers.
export const quickScoreAssumptions = {
  roommate: "No",
  creditConfidence: "Average",
  moveInTimeframe: "1–3 months",
} as const satisfies Pick<
  ReadinessScoreInput,
  "roommate" | "creditConfidence" | "moveInTimeframe"
>;

export function calculateQuickReadinessScore(input: {
  monthlyRent: number;
  annualIncome: number;
  savings: number;
  monthlyDebt: number;
  hasCosigner: boolean;
}): ReadinessScoreResult {
  return calculateReadinessScore({
    ...quickScoreAssumptions,
    monthlyRent: input.monthlyRent,
    annualIncome: input.annualIncome,
    savings: input.savings,
    monthlyDebt: input.monthlyDebt,
    cosigner: input.hasCosigner ? "Yes" : "No",
  });
}

export type ScoreImprovement = {
  id: "savings-next" | "savings-full" | "rent" | "debt" | "cosigner";
  action: string;
  detail: string;
  newScore: number;
  gain: number;
  newLabel: string;
};

const roundUpTo = (value: number, step: number) => Math.ceil(value / step) * step;
const roundDownTo = (value: number, step: number) => Math.floor(value / step) * step;
const dollars = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

// "What if" changes worked out from the person's own answers. Each one is
// re-scored with the full formula, so side effects are included (a lower rent
// also lowers the move-in savings needed, for example).
export function getScoreImprovements(input: ReadinessScoreInput): ScoreImprovement[] {
  const base = calculateReadinessScore(input);
  const monthlyRent = safeNonNegative(input.monthlyRent);
  const savings = safeNonNegative(input.savings);
  const monthlyDebt = safeNonNegative(input.monthlyDebt);
  const { grossMonthlyIncome, rentMultiple, debtRatio } = base;

  if (monthlyRent <= 0 || grossMonthlyIncome <= 0) {
    return [];
  }

  const candidates: Array<Omit<ScoreImprovement, "newScore" | "gain" | "newLabel"> & {
    changed: Partial<ReadinessScoreInput>;
  }> = [];

  // Savings: the next milestone (1, 2 or 3 months of rent), and the full
  // three-month buffer when that is a different amount.
  const savingsTargets = [1, 2, 3]
    .map((months) => monthlyRent * months)
    .filter((target) => target > savings);
  if (savingsTargets.length > 0) {
    const nextAmount = roundUpTo(savingsTargets[0] - savings, 50);
    candidates.push({
      id: "savings-next",
      action: `Save ${dollars(nextAmount)} more`,
      detail: `Brings your savings to about ${dollars(savings + nextAmount)}.`,
      changed: { savings: savings + nextAmount },
    });

    const fullAmount = roundUpTo(savingsTargets[savingsTargets.length - 1] - savings, 50);
    if (fullAmount !== nextAmount) {
      candidates.push({
        id: "savings-full",
        action: `Save ${dollars(fullAmount)} more`,
        detail: `Covers the full estimated move-in buffer of three months' rent.`,
        changed: { savings: savings + fullAmount },
      });
    }
  }

  // Rent: the highest rent that reaches the next income-multiple step.
  const nextMultiple = [1.5, 2, 2.5, 3].find((step) => rentMultiple < step);
  if (nextMultiple) {
    const rentTarget = roundDownTo(grossMonthlyIncome / nextMultiple, 25);
    if (rentTarget > 0 && rentTarget < monthlyRent) {
      candidates.push({
        id: "rent",
        action: `Look at apartments around ${dollars(rentTarget)}/month`,
        detail: `${dollars(monthlyRent - rentTarget)} a month less than your target, which puts your income at ${nextMultiple}x the rent.`,
        changed: { monthlyRent: rentTarget },
      });
    }
  }

  // Debt: the highest monthly payment that reaches the next debt step.
  const nextDebtShare = [0.3, 0.2, 0.1].find((step) => debtRatio > step);
  if (nextDebtShare) {
    const debtTarget = roundDownTo(grossMonthlyIncome * nextDebtShare, 10);
    if (debtTarget < monthlyDebt) {
      candidates.push({
        id: "debt",
        action: `Lower monthly debt payments to ${dollars(debtTarget)} or less`,
        detail: `${dollars(monthlyDebt - debtTarget)} a month less than now, about ${Math.round(nextDebtShare * 100)}% of your gross monthly income.`,
        changed: { monthlyDebt: debtTarget },
      });
    }
  }

  if (input.cosigner !== "Yes") {
    candidates.push({
      id: "cosigner",
      action: "Have a co-signer confirmed",
      detail:
        "Only counts where the landlord accepts co-signers, so ask the property manager first.",
      changed: { cosigner: "Yes" },
    });
  }

  return candidates
    .map(({ changed, ...item }) => {
      const result = calculateReadinessScore({ ...input, ...changed });
      return {
        ...item,
        newScore: result.score,
        gain: result.score - base.score,
        newLabel: result.label,
      };
    })
    .filter((item) => item.gain > 0);
}
