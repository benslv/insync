import type { Session } from "@remix-run/node";
import { isAfter, parseISO } from "date-fns";

export function tokenHasExpired(session: Session) {
	const expiryDate = session.get("expiry_date");

	if (!expiryDate) return true;

	const now = new Date();
	return isAfter(now, parseISO(expiryDate));
}
