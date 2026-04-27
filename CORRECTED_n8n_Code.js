// Soho MedSpa – Vapi Webhook Handler
// Parses Vapi tool-calls/function-call and builds response + save payload

const body = $input.first().json.body || $input.first().json;

let funcName = '';
let params = {};
let toolCallId = '';

// Handle both message formats from Vapi
if (body?.message?.type === 'function-call') {
  funcName = body.message.functionCall?.name || '';
  params = body.message.functionCall?.parameters || {};
} else if (body?.message?.type === 'tool-calls') {
  const tc = body.message.toolCalls?.[0] || body.message.toolCallList?.[0];
  funcName = tc?.function?.name || '';
  params = tc?.function?.arguments || {};
  toolCallId = tc?.id || '';
} else {
  funcName = body.request?.custom?.function_name || '';
  params = body.request?.custom?.parameters || '';
  toolCallId = body.request?.custom?.tool_call_id || '';
}

let result = '';
let preserveService = false;

switch(funcName) {
  case 'book_appointment':
    result = 'Great! I\'ve booked your ' + (params.service || 'appointment') + ' for ' + (params.date || 'the requested date') + ' at ' + (params.time || 'the requested time') + '. We look forward to seeing you!';
    break;
  case 'capture_lead':
    result = 'Got it, ' + (params.name || 'there') + '! I have saved your info and our team will follow up with you soon. Is there anything else I can help with?';
    break;
  case 'reschedule_appointment':
    result = 'Done! Your ' + (params.service || 'appointment') + ' has been rescheduled to ' + (params.new_date || 'a new date') + ' at ' + (params.new_time || 'a new time') + '. We will send you an updated confirmation.';
    break;
  case 'cancel_appointment':
    result = 'Your ' + (params.service || 'appointment') + ' has been cancelled. If you would like to rebook, just give us a call!';
    preserveService = true;
    break;
  default:
    result = 'I can help you with that.';
}

const vapiResponse = { results: [{ toolCallId: toolCallId || undefined, result }] };

return [{
  json: {
    vapiResponse,
    savePayload: { action: funcName, ...params, preserveService },
    funcName
  }
}];