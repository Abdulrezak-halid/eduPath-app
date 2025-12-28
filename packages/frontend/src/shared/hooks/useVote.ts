/**
 * useVote Hook
 * 
 * Custom hook for managing voting functionality
 */

import { useState, useEffect, useCallback } from 'react';
import { votesService, VoteType } from '../../services/votes.service';
import { questionsService } from '../../services/questions.service';
import { answersService } from '../../services/answers.service';
import { adviceService } from '../../services/advice.service';

interface IUseVoteParams {
  contentType: 'question' | 'answer' | 'advice';
  contentId: string;
  questionId?: string; // Required for answers
}

interface IUseVoteResult {
  userVote: VoteType | null;
  loading: boolean;
  voting: boolean;
  handleVote: (voteType: VoteType) => Promise<void>;
}

export const useVote = ({
  contentType,
  contentId,
  questionId,
}: IUseVoteParams): IUseVoteResult => {
  const [userVote, setUserVote] = useState<VoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  // Load user's existing vote
  useEffect(() => {
    const loadVote = async () => {
      try {
        const vote = await votesService.getUserVote(contentType, contentId);
        setUserVote(vote?.voteType || null);
      } catch (error) {
        console.error('Error loading vote:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVote();
  }, [contentType, contentId]);

  const handleVote = useCallback(
    async (voteType: VoteType) => {
      setVoting(true);
      try {
        const previousVote = userVote;

        // If clicking the same vote, remove it
        if (previousVote === voteType) {
          await votesService.removeVote(contentType, contentId);
          setUserVote(null);

          // Update content vote counts
          if (contentType === 'question') {
            await questionsService.updateVoteCount(contentId, voteType, 'remove');
          } else if (contentType === 'answer' && questionId) {
            await answersService.updateVoteCount(questionId, contentId, voteType, 'remove');
          } else if (contentType === 'advice') {
            // Advice only has upvotes
            if (voteType === 'upvote') {
              await adviceService.updateVoteCount(contentId, 'remove');
            }
          }
        } else {
          // Cast or change vote
          await votesService.vote(contentType, contentId, voteType);
          setUserVote(voteType);

          // Update content vote counts
          if (contentType === 'question') {
            await questionsService.updateVoteCount(contentId, voteType, 'add');
            // If changing vote, remove the old one
            if (previousVote) {
              await questionsService.updateVoteCount(
                contentId,
                previousVote,
                'remove'
              );
            }
          } else if (contentType === 'answer' && questionId) {
            await answersService.updateVoteCount(questionId, contentId, voteType, 'add');
            if (previousVote) {
              await answersService.updateVoteCount(
                questionId,
                contentId,
                previousVote,
                'remove'
              );
            }
          } else if (contentType === 'advice') {
            // Advice only has upvotes, not downvotes
            if (voteType === 'upvote') {
              await adviceService.updateVoteCount(contentId, 'add');
            }
          }
        }
      } catch (error) {
        console.error('Error voting:', error);
        // Revert state on error
        setUserVote(userVote);
      } finally {
        setVoting(false);
      }
    },
    [contentType, contentId, questionId, userVote]
  );

  return {
    userVote,
    loading,
    voting,
    handleVote,
  };
};
