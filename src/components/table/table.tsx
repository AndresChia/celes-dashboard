import { useTranslation } from 'react-i18next';

interface Props {
  data: any;
  columns: string[];
}

export const Table = ({ columns, data }: Props) => {
  const { t } = useTranslation();

  const getData = (column: string, data: any) => {
    const cols = column.split('.');
    let aux: any = '';
    cols.forEach((element) => {
      if (aux === '') {
        aux = data[element];
      } else {
        aux = aux[element];
      }
    });
    return aux;
  };

  return (
    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      {columns.map((column) => (
        <div key={column} className="flex flex-col pb-3">
          <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
            {t('table.' + column.replaceAll('.', '-'))}
          </dt>
          <dd className="text-lg text-gray-500 font-semibold">{getData(column, data)}</dd>
        </div>
      ))}
    </dl>
  );
};
