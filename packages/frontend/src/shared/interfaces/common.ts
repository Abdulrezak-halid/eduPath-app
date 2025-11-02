import { ReactNode } from 'react';

export interface IModule {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
}

export interface IAdvice {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  tags: string[];
}

export interface IQuestion {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  answers: IAnswer[];
  tags: string[];
}

export interface IAnswer {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  isAccepted: boolean;
}