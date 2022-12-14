import React, { useState } from 'react';
import ErrorAlert from "../components/ErrorAlert";


function AddCharityPage(){

    const [data, setData] = useState({ name: "", category: "", link: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    const fieldChanged = (name) => {
        return (event) => {
          let { value } = event.target;
          setData((prevData) => ({ ...prevData, [name]: value }));
        };
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        let response = await fetch("/api/charities", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                category: data.category,
                link: data.link,
            }),
        });

        if (response.ok) {
            setSuccess(true);
        } else {
            setError(true);
        }
        } catch (error) {
            console.error("Server error while creating a new charity", error);
            setError(true);
        }

        setData({ name: "", category: "", link: "" })
    }

    return (
        <div className='container'>
            {error && <ErrorAlert details={"Failed to save the content"} />}
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label>Charity Name:</label>
                    <input 
                    type="text" 
                    className="form-control"
                    name="name"
                    placeholder="Organization Name"
                    value={data.name}
                    onChange={fieldChanged("name")}
                    />
                    <br></br>
                    <label>Category:</label>
                    <input 
                    type="text" 
                    className="form-control"
                    name="category"
                    placeholder="Category"
                    value={data.category}
                    onChange={fieldChanged("category")}
                    />
                    <br></br>
                    <label>Link:</label>
                    <input 
                    type="text" 
                    className="form-control"
                    name="link"
                    placeholder="Link"
                    value={data.link}
                    onChange={fieldChanged("link")}
                    />
                    <br></br>
                    <input type="submit" className="btn btn-primary btn-block" value="Add Charity" />
                </div>
            </form>
        </div>
    );
}

export default AddCharityPage;

