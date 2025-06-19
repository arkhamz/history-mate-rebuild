//DB records
export interface User {
  id: string;
  created_at: string;
  username: string;
}

export type AuthenticatedUser = {
  username: string;
  userId: string;
};

export interface Battle {
  id: number;
  created_at: string;
  prelude: string;
  name: string;
  description: string;
  image_url: string;
  video_url: string;
  date: string;
  latitude: number;
  longitude: number;
  army_one: Army;
  army_two: Army;
  result: string;
  start_date: string;
  end_date: string;
  completed: boolean;
}

export interface Army {
  beligerents: Array<string[]>;
  commanders: Array<string[]>;
  strength: { number: number; guns: number };
  casualties: string;
}

export interface Commander {
  id: number;
  created_at: string;
  full_name: string;
  title: string;
  loyalty: string;
  loyalty_image_url: string;
  image_url: string;
  birth_date: string;
  death_date: string;
  birth_location: string;
  bio: string;
}

export interface Question {
  id: number;
  battle_id: number;
  text: string;
  created_at: string;
}

export interface QuestionAnswer {
  id: number;
  created_at: string;
  answer_text: string;
  title: string;
  question_id: number;
  is_correct: boolean;
}

export interface QuestionData {
  answers: QuestionAnswer[];
  question: Question;
}
