function isDiffMoreThan24Hours(dateTime1, dateTime2) {
	// Get the difference in milliseconds
	const diffInMs = Math.abs(dateTime2.getTime() - dateTime1.getTime());

	// Convert milliseconds to hours
	const diffInHours = diffInMs / (1000 * 60 * 60);

	return diffInHours >= 24;
}

export default isDiffMoreThan24Hours;
