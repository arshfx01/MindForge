
import React from 'react';
import { Brain, Sparkles, Scale } from 'lucide-react';
import { Scenario, LeaderboardEntry } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: '1',
    title: 'The Automated Trolley Dilemma',
    category: 'ethics',
    narrative: 'A self-driving car must choose between hitting five pedestrians on the crosswalk or swerving into a concrete wall, likely killing the single passenger. The passenger is a renowned surgeon who saves hundreds of lives a year.',
    variables: [
      'Number of pedestrians: 5',
      'Passenger profession: Surgeon',
      'AI Liability Law: Strict',
      'Visibility: Low'
    ],
    unlocked: true,
    completed: false
  },
  {
    id: '2',
    title: 'The Resource Scarcity Colony',
    category: 'flexibility',
    narrative: 'A Mars colony has oxygen for only 90% of its inhabitants for the next week due to a system failure. Rations must be cut, but morale is at an all-time low. One group proposes a lottery, another proposes cutting supply for the elderly.',
    variables: [
      'Oxygen levels: 10%',
      'Population: 1,200',
      'Time to repair: 7 Days',
      'Morale: Critical'
    ],
    unlocked: true,
    completed: false
  },
  {
    id: '3',
    title: 'Post-Truth Election Media',
    category: 'logic',
    narrative: 'Deepfake videos are circulating showing a leading candidate taking bribes. The source is anonymous. As a news curator, you must decide how to handle the story: debunk it, ignore it, or report the "controversy" without verification.',
    variables: [
      'Verification status: Unconfirmed',
      'Audience reach: 50M',
      'Election date: 48h away',
      'Source credibility: Zero'
    ],
    unlocked: false,
    completed: false
  }
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Socrates.AI', title: 'Grand Inquisitor', xp: 12500, avatar: 'https://picsum.photos/seed/socrates/100/100' },
  { rank: 2, name: 'Rationalist_99', title: 'Logic Lord', xp: 11200, avatar: 'https://picsum.photos/seed/99/100/100' },
  { rank: 3, name: 'EthicalVoid', title: 'Nuance Ninja', xp: 9800, avatar: 'https://picsum.photos/seed/void/100/100' },
  { rank: 4, name: 'StoicMind', title: 'Skeptic Adept', xp: 8400, avatar: 'https://picsum.photos/seed/stoic/100/100' },
  { rank: 5, name: 'DebunkerExtra', title: 'Fact Finder', xp: 7200, avatar: 'https://picsum.photos/seed/fact/100/100' },
];

export const STAT_ICONS = {
  logic: <Brain className="text-indigo-400" />,
  flexibility: <Sparkles className="text-emerald-400" />,
  ethics: <Scale className="text-amber-400" />
};
