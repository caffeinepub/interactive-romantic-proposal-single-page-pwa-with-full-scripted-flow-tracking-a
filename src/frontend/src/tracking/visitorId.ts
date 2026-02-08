const VISITOR_ID_KEY = 'romantic_proposal_visitor_id';

function generateVisitorId(): string {
  return `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function getOrCreateVisitorId(): string {
  try {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
  } catch (error) {
    console.error('Failed to get/create visitor ID:', error);
    return generateVisitorId();
  }
}
