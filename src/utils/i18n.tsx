import { useTranslation } from 'react-i18next';

interface Props {
  i18n: string;
  params?: { [key: string]: string };
}

export const I18nTranslate = ({ i18n, params = {} }: Props) => {
  let { t } = useTranslation();
  return <> {t(i18n, params)}</>;
};
