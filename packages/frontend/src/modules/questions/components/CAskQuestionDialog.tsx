/**
 * CAskQuestionDialog
 *
 * Modal dialog for creating a new question
 */

import { FC, useState, useCallback, ChangeEvent } from 'react';
import { Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { questionsService } from '../../../services/questions.service';
import { MajorField } from '../../../models/firestore.models';
import { IQuestionFormData } from '../../../models/component-inputs';
import {
  ICSelectOption,
  CDialog,
  CButton,
  CTextField,
  CSelect,
  CChipInput,
} from '@/base/components';

interface ICAskQuestionDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CAskQuestionDialog: FC<ICAskQuestionDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();

  const MAJOR_OPTIONS: ICSelectOption[] = [
    { value: 'computer-science', label: t('majors.computerScience') },
    { value: 'engineering', label: t('majors.engineering') },
    { value: 'medicine', label: t('majors.medicine') },
    { value: 'business', label: t('majors.business') },
    { value: 'law', label: t('majors.law') },
    { value: 'arts', label: t('majors.arts') },
    { value: 'sciences', label: t('majors.sciences') },
    { value: 'education', label: t('majors.education') },
    { value: 'architecture', label: t('majors.architecture') },
    { value: 'other', label: t('majors.other') },
  ];

  const CATEGORY_OPTIONS: ICSelectOption[] = [
    { value: 'academic', label: t('categories.academic') },
    { value: 'career', label: t('categories.career') },
    { value: 'social', label: t('categories.social') },
    { value: 'financial', label: t('categories.financial') },
    { value: 'general', label: t('categories.general') },
  ];

  const [formData, setFormData] = useState<IQuestionFormData>({
    title: '',
    content: '',
    tags: [],
    major: undefined,
    category: 'general',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof IQuestionFormData, value: string | string[]) => {
      setFormData((prev: IQuestionFormData) => ({ ...prev, [field]: value }));
      // Clear field error when user types
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(async () => {
    setSubmitError(null);
    setErrors({});

    setLoading(true);
    try {
      await questionsService.create(formData);

      // Reset form
      setFormData({
        title: '',
        content: '',
        tags: [],
        major: undefined,
        category: 'general',
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating question:', error);
      setSubmitError(
        error instanceof Error ? error.message : t('questions.errorCreating')
      );
    } finally {
      setLoading(false);
    }
  }, [formData, onClose, onSuccess]);

  const handleCancel = useCallback(() => {
    setFormData({
      title: '',
      content: '',
      tags: [],
      major: undefined,
      category: 'general',
    });
    setErrors({});
    setSubmitError(null);
    onClose();
  }, [onClose]);

  return (
    <CDialog
      open={open}
      onClose={handleCancel}
      title={t('questions.askQuestion')}
      maxWidth="md"
      fullWidth
      actions={
        <>
          <CButton onClick={handleCancel} disabled={loading}>
            {t('questions.cancel')}
          </CButton>
          <CButton onClick={handleSubmit} loading={loading}>
            {t('questions.postQuestion')}
          </CButton>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {submitError && (
          <Alert severity="error" onClose={() => setSubmitError(null)}>
            {submitError}
          </Alert>
        )}

        <CTextField
          label={t('questions.title')}
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('title', e.target.value)
          }
          error={!!errors.title}
          helperText={
            errors.title || t('questions.titleHelper')
          }
          placeholder={t('questions.titlePlaceholder')}
          required
          disabled={loading}
        />

        <CTextField
          label={t('questions.content')}
          value={formData.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange('content', e.target.value)
          }
          error={!!errors.content}
          helperText={
            errors.content || t('questions.contentHelper')
          }
          placeholder={t('questions.contentPlaceholder')}
          multiline
          rows={6}
          required
          disabled={loading}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <CSelect
            label={t('questions.major')}
            value={formData.major || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('major', e.target.value as MajorField)
            }
            error={!!errors.major}
            helperText={errors.major}
            options={MAJOR_OPTIONS}
            emptyLabel={t('questions.selectMajor')}
            disabled={loading}
            sx={{ flex: 1 }}
          />

          <CSelect
            label={t('questions.category')}
            value={formData.category}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(
                'category',
                e.target.value as IQuestionFormData['category']
              )
            }
            error={!!errors.category}
            helperText={errors.category}
            options={CATEGORY_OPTIONS}
            required
            disabled={loading}
            sx={{ flex: 1 }}
          />
        </Box>

        <CChipInput
          label={t('questions.tags')}
          value={formData.tags}
          onChange={(tags) => handleChange('tags', tags)}
          error={!!errors.tags}
          helperText={
            errors.tags || t('questions.tagsHelper')
          }
          maxItems={5}
          disabled={loading}
        />
      </Box>
    </CDialog>
  );
};
