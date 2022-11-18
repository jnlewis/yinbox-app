export const formatTime = (datetime?: Date): string => {
  if (datetime) {
    return datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  } else {
    return '';
  }
};
