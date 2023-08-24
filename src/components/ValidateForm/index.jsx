export default function validateForm(props) {
  const { fullName, email, phone, password, confirmPassword, nationalID } =
    props;

  if (fullName.length == 0) {
    alert("Invalid Form, First Name can not be empty");
    return;
  }
}
