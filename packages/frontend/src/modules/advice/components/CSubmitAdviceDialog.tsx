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
    { value: 'time-management', label: t('categoriesTimeManagement') },
    { value: 'study-tips', label: t('categoriesStudyTips') },
    { value: 'career', label: t('categoriesCareer') },
    { value: 'social', label: t('categoriesSocial') },
    { value: 'mental-health', label: t('categoriesMentalHealth') },
    { value: 'general', label: t('categoriesGeneral') },
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
      title={t('adviceShareAdvice')}
      maxWidth="md"
      fullWidth
      actions={
        <>
          <CButton onClick={handleCancel} disabled={loading}>
            {t('questionsCancel')}
          </CButton>
          <CButton onClick={handleSubmit} loading={loading}>
            {t('adviceSubmitAdvice')}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('title', e.target.value)
          }
          error={!!errors.title}
          helperText={
            errors.title || t('adviceAdviceTitle')
          }
          placeholder={t('questionsTitlePlaceholder')}
          required
          disabled={loading}
        />

        <CTextField
          label={t('questionsContent')}
          value={formData.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange('content', e.target.value)
          }
          error={!!errors.content}
          helperText={
            errors.content || t('adviceAdviceContent')
          }
          placeholder={t('questionsContentPlaceholder')}
          multiline
          rows={8}
          required
          disabled={loading}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <CSelect
            label={t('questionsMajor')}
            value={formData.major}
            onChange={(e) => handleChange('major', e.target.value)}
            error={!!errors.major}
            helperText={errors.major}
            options={MAJOR_OPTIONS}
            emptyLabel={t('questionsSelectMajor')}
            required
            disabled={loading}
            sx={{ flex: 1 }}
          />

          <CSelect
            label={t('questionsCategory')}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
            options={CATEGORY_OPTIONS}
            emptyLabel={t('questionsSelectMajor')}
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
            errors.tags || t('adviceAdviceTags')
          }
          maxItems={5}
          disabled={loading}
        />
      </Box>
    </CDialog>
  );
};
