<?php

	$responce = array(
		"errors" => 0,
		"errorlog" => array(
			"name" => "",
			"phone" => "",
			"email" => "",
			"other" => ""
		)
	);

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
			if(!preg_match('/((8|\+7)-?)?\(?\d{3,5}\)?-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}((-?\d{1})?-?\d{1})?/', $phone)){
				array_push($errors, "ERR_PHONE_INVALID");
			}
		} else {
			array_push($errors, "ERR_PHONE_UNSET");
		} // checking phone

		if (isset($_POST["email"]) && !empty($_POST["email"])) {
			$email = trim(htmlspecialchars($_POST["email"]));
			if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				array_push($errors, "ERR_EMAIL_INVALID");
			}
		} else {
			array_push($errors, "ERR_EMAIL_UNSET");
		} // checking email

	} else {
		array_push($errors, "ERR_WRONG_METHOD"); // checking request method
	}

	// generating responce messages
	if(sizeOf($errors) > 0) {

		$responce["errors"] = 1;

		foreach ($errors as $error) {
			switch ($error) {
				case "ERR_NAME_INVALID":
					$responce["errorlog"]["name"] = "Имя задано неверно";
					break;
				case "ERR_NAME_UNSET":
					$responce["errorlog"]["name"] = "Введите имя";
					break;
				case "ERR_PHONE_INVALID":
					$responce["errorlog"]["phone"] = "Телефон задан неверно";
					break;
				case "ERR_PHONE_UNSET":
					$responce["errorlog"]["phone"] = "Введите телефон";
					break;
				case "ERR_EMAIL_INVALID":
					$responce["errorlog"]["email"] = "E-mail задан неверно";
					break;
				case "ERR_EMAIL_UNSET":
					$responce["errorlog"]["email"] = "Введите e-mail";
					break;
				case "ERR_WRONG_METHOD":
					$responce["errorlog"]["other"] = "Вы человек?";
					break;
			}
		}
	}
	
	echo json_encode($responce);

?>