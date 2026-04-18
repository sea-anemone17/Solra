import { saveWork, deliverWork } from "../logic/dm-actions.js";
import { makeReview } from "../logic/reviews.js";

function getReviewTemplatePool(reviewTemplates, subject) {
  if (reviewTemplates[subject]) {
    return [...reviewTemplates[subject], ...reviewTemplates.common];
  }
  return reviewTemplates.common;
}

export function createAttachmentId() {
  return `attachment-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function handleRemoveAttachment(state, dmId, attachmentId) {
  state.dmRequests = state.dmRequests.map((dm) => {
    if (dm.id !== dmId) return dm;

    return {
      ...dm,
      attachments: (dm.attachments || []).filter(
        (file) => file.id !== attachmentId
      )
    };
  });
}

export function handleSaveWork(state, dmId, pushNotification, workSavedMessage) {
  const dm = state.dmRequests.find((item) => item.id === dmId);
  if (!dm) return;

  state.dmRequests = saveWork(state.dmRequests, dmId, dm.savedWork || "");
  pushNotification("작업물 저장", workSavedMessage);
}

export function handleDeliverWork(
  state,
  dmId,
  pushNotification,
  refreshProfileState,
  reviewTemplates,
  messages
) {
  const dm = state.dmRequests.find((item) => item.id === dmId);

  if (!dm) return;
  if (dm.status === "completed") return;

  const alreadyReviewed = state.reviews.some((review) => review.taskId === dmId);
  if (alreadyReviewed) return;

  const workText = (dm.savedWork || "").trim();

  if (!workText) {
    alert("전달할 작업물을 입력해 주세요.");
    return;
  }

  state.dmRequests = deliverWork(state.dmRequests, dmId, workText);

  const deliveredDm = state.dmRequests.find((item) => item.id === dmId);
  const reviewTemplatePool = getReviewTemplatePool(reviewTemplates, deliveredDm.subject);
  const review = makeReview(deliveredDm, reviewTemplatePool);

  state.reviews.unshift(review);
  if (state.reviews.length > 10) {
    state.reviews.pop();
  }

  state.profile.reviewCount += 1;
  state.profile.xp += 10;
  state.profile.completeCount += 1;

  refreshProfileState();

  pushNotification("작업물 전달", messages.workDelivered);
  pushNotification("후기 도착", messages.reviewArrived);
}
