import authService from "./authService";

export function handleRejectResponse(message) {
    console.log("handleRejectResponse called : ",message);
    if (message == "TokenExpiredError") {
        console.log("handleRejectResponse called inside");
        authService.logout();
        window.location.reload();
    }
}