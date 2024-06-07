interface Props {
  width?: number;
  height?: number;
}
export const ChartSkeleton = ({ width, height }: Props) => {
  return (
    <div
      style={{
        height: height ? `${height}px` : '',
        width: width ? `${width}px` : ''
      }}
      role="status"
      className={`${width ? `w-[${width}px]` : ''} ${height ? `h-[${height}px]` : ''} p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700`}>
      <div className="flex items-baseline mt-4">
        <div
          style={{ height: height ? `${height - 8 - 86}px` : '18rem' }}
          className={`w-full bg-gray-200 rounded-t-lg  dark:bg-gray-700`}></div>
        <div
          style={{ height: height ? `${height - 26 - 86}px` : '14rem' }}
          className={`w-full ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700`}></div>
        <div
          style={{ height: height ? `${height - 8 - 86}px` : '18rem' }}
          className={`w-full bg-gray-200 rounded-t-lg ms-6 dark:bg-gray-700`}></div>
        <div
          style={{ height: height ? `${height - 16 - 86}px` : '16rem' }}
          className={`w-full ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700`}></div>
        <div
          style={{ height: height ? `${height - 5 - 86}px` : '20rem' }}
          className={`w-full bg-gray-200 rounded-t-lg ms-6 dark:bg-gray-700`}></div>
        <div
          style={{ height: height ? `${height - 8 - 86}px` : '18rem' }}
          className={`w-full bg-gray-200 rounded-t-lg ms-6 dark:bg-gray-700`}></div>
        <div
          style={{ height: height ? `${height - 5 - 86}px` : '20rem' }}
          className={`w-full bg-gray-200 rounded-t-lg ms-6 dark:bg-gray-700`}></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
