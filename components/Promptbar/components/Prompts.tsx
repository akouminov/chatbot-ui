import { FC } from 'react';

import { Prompt } from '@/types/prompt';

import { PromptComponent } from './Prompt';

interface Props {
  prompts: Prompt[];
}

function comparePromptIds(a,b){
  return a.order - b.order;
}

export const Prompts: FC<Props> = ({ prompts }) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {prompts
        .slice()
        .reverse()
        .sort(comparePromptIds)
        .map((prompt, index) => (
          <PromptComponent key={index} prompt={prompt} />
        ))}
    </div>
  );
};
