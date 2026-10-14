// Correlated tries. Five mutual friends each introduce you with chance P = 10% in a given week.
// Separate circles: the five are independent, so P(meet) = 1 - 0.9^5. One circle: it meets in a
// share q of weeks; only in those weeks can anyone introduce you, each with chance P / q (so each
// friend's own chance stays 10%). P(meet) = q * (1 - (1 - P/q)^5). A teaching model, not data.

export const FRIENDS = 5;
export const P = 0.1;
/** Meeting shares offered on the stage, as chips. */
export const SHARES = [1, 0.5, 0.25, 0.1];
export const WEEKS = 20;

export const separate = (p = P, k = FRIENDS) => 1 - (1 - p) ** k;
export const inMeetingWeek = (q: number, p = P) => p / q;
export const oneCircle = (q: number, p = P, k = FRIENDS) => q * (1 - (1 - p / q) ** k);
