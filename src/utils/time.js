
export function timeToSeconds(time) {
  const [clock, period] = time.trim().split(/\s+/);
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 3600 + minutes * 60;
}

export function currentTimeInSeconds() {
  const now = new Date();

  return (
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds()
  );
}

