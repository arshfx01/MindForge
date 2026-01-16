
export interface Scenario {
  id: string;
  title: string;
  narrative: string;
  variables: string[];
  category: 'logic' | 'flexibility' | 'ethics';
  unlocked: boolean;
  completed: boolean;
}

export interface UserStats {
  logicProwess: number;
  cognitiveFlexibility: number;
  ethicalNuance: number;
}

export interface Feedback {
  score: number;
  feedbackMarkdown: string;
  fallaciesArray: string[];
  xpAwarded: number;
  strategicPivot: string;
}

export interface GameState {
  xp: number;
  level: number;
  streak: number;
  stats: UserStats;
  unlockedScenarios: string[];
  completedScenarios: string[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  title: string;
  xp: number;
  avatar: string;
}
