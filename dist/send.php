<?php

	$errors = array();

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {

		if (isset($_POST["name"]) && !empty($_POST["name"])) {
			$name = trim(htmlspecialchars($_POST["name"]));
			if(!preg_match('/^[a-zA-Z0-9\s]+$/', $name)) {
				array_push($errors, "ERR_NAME_INVALID");
			}
		} else {
			array_push($errors, "ERR_NAME_UNSET");
		} // checking name

		if (isset($_POST["phone"]) && !empty($_POST["phone"])) {
			$phone = trim(htmlspecialchars($_POST["phone"]));
		} else {
			array_push($errors, "ERR_PHONE_UNSET");
		} // checking name

		if (isset($_POST["email"]) && !empty($_POST["email"])) {
			$email = trim(htmlspecialchars($_POST["email"]));
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				array_push($errors, "ERR_EMAIL_INVALID");
			}
		} else {
			array_push($errors, "ERR_EMAIL_UNSET");
		} // checking name

	} else {
		array_push($errors, "ERR_WRONG_METHOD"); // checking request method
	}

	echo json_encode($errors);

?>