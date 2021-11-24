export interface Task {
    id: string;
    title: string;
    description: string;
    type: number;
    priority: number;
    progress: number;
    created_at: string;
    updated_at: string;
  }