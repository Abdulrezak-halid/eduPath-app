/**
 * CSubmitAdviceDialog
 *
 * Modal dialog for submitting new advice
 */

import { FC, useState, useCallback } from 'react';
import { Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { adviceService } from '../../../services/advice.service';
import { IAdviceFormData } from '../../../models/component-inputs';
import {
  ICSelectOption,
  CDialog,
  CButton,
  CTextField,
  CSelect,
  CChipInput,
} from '@/base/components';

interface ICSubmitAdviceDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CSubmitAdviceDialog: FC<ICSubmitAdviceDialogProps> = ({
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
    { value: 'time-management', label: t('categories.timeManagement') },
    { value: 'study-tips', label: t('categories.studyTips') },
    { value: 'career', label: t('categories.career') },
    { value: 'social', label: t('categories.social') },
    { value: 'mental-health', label: t('categories.mentalHealth') },
    { value: 'general', label: t('categories.general') },
  ];
  const [formData, setFormData] = useState<IAdviceFormData>({
    title: '',
    content: '',
    tags: [],
    major: 'computer-science',
    category: 'general',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof IAdviceFormData, value: string | string[]) => {
      setFormData((prev: IAdviceFormData) => ({ ...prev, [field]: value }));
      // Clear field error
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
      await adviceService.create(formData);

      // Reset form
      setFormData({
        title: '',
        content: '',
        tags: [],
        major: 'computer-science',
        category: 'general',
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating advice:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit advice'
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
      major: 'computer-science',
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
      title={t('advice.shareAdvice')}
      maxWidth="md"
      fullWidth
      actions={
        <>
          <CButton onClick={handleCancel} disabled={loading}>
            {t('questions.cancel')}
          </CButton>
          <CButton onClick={handleSubmit} loading={loading}>
            {t('advice.submitAdvice')}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('title', e.target.value)
          }
          error={!!errors.title}
          helperText={
            errors.title || t('advice.adviceTitle')
          }
          placeholder={t('questions.titlePlaceholder')}
          required
          disabled={loading}
        />

        <CTextField
          label={t('questions.content')}
          value={formData.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange('content', e.target.value)
          }
          error={!!errors.content}
          helperText={
            errors.content || t('advice.adviceContent')
          }
          placeholder={t('questions.contentPlaceholder')}
          multiline
          rows={8}
          required
          disabled={loading}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <CSelect
            label={t('questions.major')}
            value={formData.major}
            onChange={(e) => handleChange('major', e.target.value)}
            error={!!errors.major}
            helperText={errors.major}
            options={MAJOR_OPTIONS}
            emptyLabel={t('questions.selectMajor')}
            required
            disabled={loading}
            sx={{ flex: 1 }}
          />

          <CSelect
            label={t('questions.category')}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
            options={CATEGORY_OPTIONS}
            emptyLabel={t('questions.selectMajor')}
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
            errors.tags || t('advice.adviceTags')
          }
          maxItems={5}
          disabled={loading}
        />
      </Box>
    </CDialog>
  );
};
