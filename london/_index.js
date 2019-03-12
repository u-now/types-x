// @ts-nocheck
// ts-nocheck
var current, template, email;

if (current.approver.getTableName() == 'sysapproval_approver') {
  if (current.approver == email.from_sys_id) {
    current.comments = 'reply from: ' + email.from + '\n\n' + email.body_text;
    // if it's been cancelled, it's cancelled.
    var doit = true;
    if (current.state == 'cancelled') doit = false;
    if (email.body.state != undefined) current.state = email.body.state;
    if (doit) current.update();
  } else {
    gs.log(
      'Approval for task (' +
        current.sysapproval.getDisplayValue() +
        ') rejected because user sendingemail( ' +
        email.from +
        ') does not match the approver (' +
        current.approver.getDisplayValue() +
        ')'
    );
  }
}
