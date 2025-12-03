export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'N/A';
  }
}

export function formatYear(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  } catch {
    return 'N/A';
  }
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes || minutes === 0) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString('en-US');
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || amount === 0) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

