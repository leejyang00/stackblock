
const TimeFormat = ({ dateCreated, classProps }) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const created = new Date(dateCreated);
  const today = new Date();

  const utcCreated = Date.UTC(
    created.getFullYear(),
    created.getMonth(),
    created.getDate()
  );
  const utcToday = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diff = Math.floor((utcToday - utcCreated) / _MS_PER_DAY);

  const years = Math.floor(diff / 365);
  const months = Math.floor((diff % 365) / 30);
  const days = Math.floor((diff % 365) % 30);

  const display = () => {
    if (years === 1 && months > 0) {
      return `${years} year, ${months} months ago`;
    } else if (years > 0 && months === 1) {
      return `${years} years, ${months} month ago`;
    } else if (years > 0 && months > 0) {
      return `${years} years, ${months} months ago`;
    } else if (years > 0 && months === 0) {
      return `${years} years ago`;
    } else if (years === 0 && months > 0) {
      return `${months} months ago`;
    } else if (days === 1) {
      return "yesterday";
    } else if (days === 0) {
      return "today";
    } else {
      return `${days} days ago`;
    }
  };

  return <span className={classProps}>{display()}</span>;
};

export default TimeFormat;