export type Mood = 'Street' | 'Casual' | 'Formal' | 'Feminine' | 'Modern' | 'Chic';
export type Gender = 'Male' | 'Female';

export interface MoodConfig {
  value: Mood;
  label: string;
  emoji: string;
  description: string;
}

export const MOODS: MoodConfig[] = [
  { value: 'Street', label: '스트릿', emoji: '👟', description: '힙하고 개성 넘치는 스타일' },
  { value: 'Casual', label: '캐주얼', emoji: '👕', description: '편안하고 자연스러운 스타일' },
  { value: 'Formal', label: '포멀', emoji: '👔', description: '격식 있고 깔끔한 스타일' },
  { value: 'Feminine', label: '페미닌', emoji: '👗', description: '우아하고 여성스러운 스타일' },
  { value: 'Modern', label: '모던', emoji: '🧥', description: '심플하고 정갈한 도시적인 스타일' },
  { value: 'Chic', label: '시크', emoji: '🕶️', description: '세련되고 도도한 스타일' },
];

export interface ClothRecommendation {
  category: string;
  itemName: string;
  description: string;
  stylingTip: string;
}

export interface AnalysisResponse {
  inputAnalysis: string;
  recommendations: ClothRecommendation[];
  overallTip: string;
}
