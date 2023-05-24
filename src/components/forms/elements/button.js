import React from 'react'
import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';
import { Link } from "gatsby"

const ButtonField = ({ type, name, value, fieldClass, id, step, grpmd, disable }) => (
	<Form.Group as={Col} md={grpmd} className={`${type} ${step}`} controlId={"validation" + name}>
		<Button variant="" type={type} className={fieldClass} id={id} disabled={disable}>
			{disable ? "please wait" : name} 	{fieldClass != "btn-secondary" && <i className="icon-arrow"></i>}
		</Button>
	</Form.Group>
);

export default ButtonField;
