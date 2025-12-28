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
    { value: 'computer-science', label: t('majorsComputerScience') },
    { value: 'engineering', label: t('majorsEngineering') },
    { value: 'medicine', label: t('majorsMedicine') },
    { value: 'business', label: t('majorsBusiness') },
    { value: 'law', label: t('majorsLaw') },
    { value: 'arts', label: t('majorsArts') },
    { value: 'sciences', label: t('majorsSciences') },
    { value: 'education', label: t('majorsEducation') },
    { value: 'architecture', label: t('majorsArchitecture') },
    { value: 'other', label: t('majorsOther') },
  ];

  const CATEGORY_OPTIONS: ICSelectOption[] = [
    { value: 'academic', label: t('categoriesAcademic') },
    { value: 'career', label: t('categoriesCareer') },
    { value: 'social', label: t('categoriesSocial') },
    { value: 'financial', label: t('categoriesFinancial') },
    { value: 'general', label: t('categoriesGeneral') },
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
        error instanceof Error ? error.message : t('questionsErrorCreating')
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
      title={t('questionsAskQuestion')}
      maxWidth="md"
      fullWidth
      actions={
        <>
          <CButton onClick={handleCancel} disabled={loading}>
            {t('questionsCancel')}
          </CButton>
          <CButton onClick={handleSubmit} loading={loading}>
            {t('questionsPostQuestion')}
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
          label={t('questionsFieldTitle')}
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('title', e.target.value)
          }
          error={!!errors.title}
          helperText={
            errors.title || t('questionsTitleHelper')
          }
          placeholder={t('questionsTitlePlaceholder')}
          required
          disabled={loading}
        />

        <CTextField
          label={t('questionsContent')}
          value={formData.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleChange('content', e.target.value)
          }
          error={!!errors.content}
          helperText={
            errors.content || t('questionsContentHelper')
          }
          placeholder={t('questionsContentPlaceholder')}
          multiline
          rows={6}
          required
          disabled={loading}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <CSelect
            label={t('questionsMajor')}
            value={formData.major || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('major', e.target.value as MajorField)
            }
            error={!!errors.major}
            helperText={errors.major}
            options={MAJOR_OPTIONS}
            emptyLabel={t('questionsSelectMajor')}
            disabled={loading}
            sx={{ flex: 1 }}
          />

          <CSelect
            label={t('questionsCategory')}
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
          label={t('questionsTags')}
          value={formData.tags}
          onChange={(tags) => handleChange('tags', tags)}
          error={!!errors.tags}
          helperText={
            errors.tags || t('questionsTagsHelper')
          }
          maxItems={5}
          disabled={loading}
        />
      </Box>
    </CDialog>
  );
};
