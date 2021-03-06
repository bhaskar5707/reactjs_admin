import React from 'react';
import { NavLink , Link , Redirect} from 'react-router-dom';
import {PostData} from '../category/PostData';
import { Row, Form, Col, Button } from 'react-bootstrap';
export default class EditCategory extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			category_name:null,
			categoryId:null,
			response:{},
			datas: [],
			errors:{
				category_name:'',
				categoryId:''
			}
		};
		this.handleChange= this.handleChange.bind(this);
	    this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
		const apiUrl = 'http://localhost/react-ci/index.php/edit-category';
      
        const categoryId= this.props.match.params.id;
        const formData = new FormData();
	    formData.append('categoryId', categoryId);
        
	    const options = {
	        method: 'POST',
	        body: formData
        }
       

	    fetch(apiUrl, options)
        
	        .then(res => res.json())
	        .then((result) => {
                //console.log(result);
		        this.setState({
		            category_name: result.category_name,
		            categoryId: result.id
		        });
		        //console.log(result.id);
	        },
	        (error) => {
	          this.setState({ error });
	        }
	    )

	}
    handleChange(e){
		e.preventDefault();
		const {name , value} = e.target;
		let errors= this.state.errors;
		
		if(name == 'category_name'){
	    	if(value.length < 2){
	    		errors.category_name = "Category name atleast 2 character long!";

	    	}else{
	    		errors.category_name = "";
	    	}
	    	this.setState({errors, [name]: value});
	    };
	    this.setState({[e.target.name]:e.target.value});
	    console.log(e.target.value);
	}

	onFormSubmit(e) {
        e.preventDefault();
	    if(this.state.category_name)
	    {
	    	//console.log(this.state.category_name);
	    	PostData('http://localhost/react-ci/index.php/update-category',this.state).then((result) => {
	    		let responseJson = result;
	    		//console.log(responseJson);
	    		this.setState({
		          response: result,
		          formSuccess: 'Category updated successfully'
		        })
		        setTimeout(()=> this.setState({formSuccess: ''}), 1000)
	        });
	    }else{
	    	this.setState({
				formError: 'Please enter category name',
		    })
		    setTimeout(()=> this.setState({formError: ''}), 1000)
	    }
    }
	

	render() {
		const {errors , datas} = this.state;
		return (
			<div className="content-wrapper">
			    <section className="content-header">
				    <div className="container-fluid">
				        <div className="row mb-2">
				          <div className="col-sm-6">
				            <h1>Edit Category</h1>
				          </div>
				          <div className="col-sm-6">
				            <ol className="breadcrumb float-sm-right">
				              <li className="breadcrumb-item"><NavLink href="#">Home</NavLink></li>
				              <li className="breadcrumb-item active">Edit Category</li>
				            </ol>
				          </div>
				        </div>
				    </div>
			    </section>

			    <section className="content">
                    <div className="container-fluid">
						<div className="card card-default">
							<div className="card-header">
							<h3 className="card-title">Edit Category</h3>

							<div className="card-tools">
							  <Link to={"/category"} className="btn btn-primary" style={{float:'right'}}>Back</Link>
							</div>
							</div>
							
							<div className="card-body">
							    {this.state.formError ? <div className="alert alert-danger alert-dismissible">
							        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
							        <strong>Error!</strong> {this.state.formError}
							    </div> : ''}

							    {this.state.formSuccess ? <div className="alert alert-success alert-dismissible">
							        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
							        <strong>Success!</strong> {this.state.formSuccess}
							    </div> : ''}
								<div className="row">
                                    
								    <div className="col-md-6">
								        <div className="form-group">
									    <label> Category Name <span className="error">*</span></label>
									      <input type="text" className="form-control"  name="category_name" value={this.state.category_name}  placeholder="Enter Category Name" onChange={this.handleChange} />
									      {errors.category_name.length > 0 &&  <span className='error'>{errors.category_name}</span>}
									      <input type="hidden" name="categoryId" value={this.state.categoryId} onChange={this.handleChange} />
									    </div>
									    <div className="form-group">
									      <input type="submit" value="Save Category" className="btn btn-success" onClick={this.onFormSubmit} />
									    </div>
                                    </div>
								
								</div>
							
							</div>
						</div>


                    </div>
			    </section>


			   
			</div>
		);
	}
}
