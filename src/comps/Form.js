import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
const formSchema = yup.object().shape({
    name: yup.string().required("Please input a name").min(2, "Name must be 2+ characters"),
    pieSize: yup.string(),
    topPep:yup.boolean().required().oneOf([true]),
    topSau:yup.boolean().required().oneOf([true]),
    topBac:yup.boolean().required().oneOf([true]),
    topChe:yup.boolean().required().oneOf([true]),

});
export default function Form() {
    const [button, setButton] = useState(true);
    const [formState, setFormState] = useState({
        name: "",
        pieSize: "",
        topPep: "",
        topSau: "",
        topBac: "",
        topChe: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        pieSize: "",
        topPep: "",
        topSau: "",
        topBac: "",
        topChe: ""
    });
    
    const [order, setOrder] = useState([]);
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButton(!valid);
        });
    }, [formState]);
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                setOrder(res.data); 
                setFormState({
                    name: "",
                    pieSize: "",
                    topPep: "",
                    topSau: "",
                    topBac: "",
                    topChe: ""
                });
            })
            .catch(err => console.log("Something went wrong when submitting your form", err.response));
    };
    const validateChange = e => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type  === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };
    return (
        <form onSubmit={formSubmit}>
        <label htmlFor="name">
        Name
        <input
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        </label>
        <label htmlFor="pieSize">
        Pizza Size
        <select id="pieSize" name="pieSize" onChange={inputChange}>
            <option value="none"></option>
            <option value="12">12"</option>
            <option value="14">14"</option>
            <option value="16">16"</option>
        </select>
        </label>
        <label htmlFor="topPep" className="topPep">
        <input
            type="checkbox"
            name="topPep"
            checked={formState.terms}
            onChange={inputChange}
        />
        Pepperoni
        </label>
        <label htmlFor="topSau" className="topSau">
        <input
            type="checkbox"
            name="topSau"
            checked={formState.terms}
            onChange={inputChange}
        />
        Sausage
        </label>
        <label htmlFor="topBac" className="topBac">
        <input
            type="checkbox"
            name="topBac"
            checked={formState.terms}
            onChange={inputChange}
        />
        Bacon
        </label>
        <label htmlFor="topChe" className="topChe">
        <input
            type="checkbox"
            name="topChe"
            checked={formState.terms}
            onChange={inputChange}
        />
        Extra Cheese
        </label>
        <pre>{JSON.stringify(order, null, 2)}</pre>
        <button disabled={button}>Submit</button>
    </form>
    )
}