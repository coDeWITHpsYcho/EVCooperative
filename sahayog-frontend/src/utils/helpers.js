// export const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//   }).format(amount);
// };

// export const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-IN', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// };

// export const formatDateTime = (date) => {
//   return new Date(date).toLocaleString('en-IN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// export const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// };

// const deg2rad = (deg) => {
//   return deg * (Math.PI / 180);
// };

// export const getStatusColor = (status) => {
//   const colors = {
//     [RIDE_STATUS.REQUESTED]: '#ff9800',
//     [RIDE_STATUS.ACCEPTED]: '#2196f3',
//     [RIDE_STATUS.PICKED_UP]: '#9c27b0',
//     [RIDE_STATUS.IN_PROGRESS]: '#3f51b5',
//     [RIDE_STATUS.COMPLETED]: '#4caf50',
//     [RIDE_STATUS.CANCELLED]: '#f44336',
//   };
//   return colors[status] || '#757575';
// };

// export const truncateText = (text, maxLength) => {
//   if (text.length <= maxLength) return text;
//   return text.substr(0, maxLength) + '...';
// };