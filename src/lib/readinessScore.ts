export type CosignerOption = "No" | "Yes" | "Not sure";
export type RoommateOption = "No" | "Yes" | "Not sure";
export type CreditConfidence =
  | "Strong"
  | "Average"
  | "Limited or rebuilding"
  | "Prefer not to say";
export type MoveInTimeframe =
  | "This month"
  | "1-3 months"
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

export type ReadinessScoreResult = {
  score: number;
  label: string;
  rentTwin: {
    title: string;
    explanation: string;
  };
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
  categories: {
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
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const roundToHundred = (value: number) => Math.ceil(value / 100) * 100;

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

function getNextSteps(
  input: ReadinessScoreInput,
  weakestCategory: ReadinessCategoryKey,
  savingsGap: number,
  suggestedRentTarget: number,
) {
  if (weakestCategory === "savings" && savingsGap > 0) {
    return {
      topNextStep: `Save $${roundToHundred(savingsGap).toLocaleString()} more before applying.`,
      supportingActions: [
        "Use the Move-In Cost Calculator.",
        "Compare a $100 lower rent target.",
        "Prepare proof of income and ID documents.",
      ],
    };
  }

  if (weakestCategory === "income") {
    return {
      topNextStep: `Consider apartments closer to $${suggestedRentTarget.toLocaleString()}/month.`,
      supportingActions: [
        "Compare the target with a roommate option.",
        "Check whether a co-signer could help.",
        "Use the Rent Affordability Calculator.",
      ],
    };
  }

  if (weakestCategory === "debt") {
    return {
      topNextStep: "Reduce monthly debt pressure where possible.",
      supportingActions: [
        "Keep move-in savings separate from monthly bills.",
        "Compare a lower monthly rent target.",
        "Prepare a simple budget before applying.",
      ],
    };
  }

  if (weakestCategory === "support" && input.cosigner !== "Yes") {
    return {
      topNextStep: "Ask whether a co-signer could help.",
      supportingActions: [
        "Review co-signer income expectations.",
        "Gather application documents early.",
        "Ask the property manager about application requirements.",
      ],
    };
  }

  return {
    topNextStep: "Compare rent with a roommate option.",
    supportingActions: [
      "Check how shared rent changes your monthly budget.",
      "Prepare proof of income and ID documents.",
      "Build a move-in buffer before applying.",
    ],
  };
}

export function calculateReadinessScore(
  input: ReadinessScoreInput,
): ReadinessScoreResult {
  const grossMonthlyIncome = input.annualIncome > 0 ? input.annualIncome / 12 : 0;
  const rentMultiple =
    input.monthlyRent > 0 && grossMonthlyIncome > 0
      ? grossMonthlyIncome / input.monthlyRent
      : 0;
  const rentToIncomePercent =
    grossMonthlyIncome > 0 ? input.monthlyRent / grossMonthlyIncome : 0;
  const estimatedMoveInNeed = input.monthlyRent * 3;
  const savingsGap = Math.max(estimatedMoveInNeed - input.savings, 0);
  const savingsSurplus = Math.max(input.savings - estimatedMoveInNeed, 0);
  const debtRatio =
    grossMonthlyIncome > 0 ? input.monthlyDebt / grossMonthlyIncome : 1;

  let incomePoints = 5;
  if (rentMultiple >= 3) incomePoints = 40;
  else if (rentMultiple >= 2.5) incomePoints = 32;
  else if (rentMultiple >= 2) incomePoints = 22;
  else if (rentMultiple >= 1.5) incomePoints = 12;

  let savingsPoints = 4;
  if (input.savings >= estimatedMoveInNeed) savingsPoints = 25;
  else if (input.savings >= input.monthlyRent * 2) savingsPoints = 18;
  else if (input.savings >= input.monthlyRent) savingsPoints = 10;

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
      : input.moveInTimeframe === "1-3 months"
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
    input,
    weakestCategory,
    savingsGap,
    suggestedRentTarget,
  );

  const strengths = [
    rentMultiple >= 2.5
      ? "Income looks close to common 2.5x or 3x rent examples."
      : null,
    input.savings >= input.monthlyRent * 2
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
    input.savings < estimatedMoveInNeed
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

  return {
    score,
    label: getReadinessLabel(score),
    rentTwin: getRentTwin(input, score, weakestCategory, rentMultiple),
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
    categories: {
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
    },
  };
}
