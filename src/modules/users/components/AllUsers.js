import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as UserActions from '../actions';
import FlatButton from 'material-ui/FlatButton';
import { Table } from 'reactstrap';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class AllUsers extends Component{
	constructor(props){
		super(props);

			this.state = { 
			filterBy: '', 
			userTabSlideIndex: 0,
		};
	}

	componentDidMount() {
		this.props.userActions.getUsers();
	}
  //Search html tables using javascript
  handleSearch(event) {
    
    var input, filter, table, tr, td, i;

    input  = event.target.value;

    this.setState({filterBy: input});

    filter = input.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].innerHTML;
      if (td) {
        if (td.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

	render(){
		const { usersList } = this.props;
		return(
	
				<div className="column last-column col-sm-offset-2 col-sm-8">
					<div className="column-title-box">
						<p className="column-title"> User Management </p> 
					</div>
					<div className="col-xs-12"> 
							<div className="col-sm-7 col-md-7 float-left users-count-tab"> 
								<p className="users-count"> Users | { usersList.length } users </p>
							</div>
							<div className="col-sm-5 col-md-5 float-right">
								<div className="col-sm-5 col-sm-offset-2 col-md-5 col-md-offset-2"> 
									<span className="search-users"> 
										<ValidatorForm
											ref="form"
											onSubmit={() => console.log(this.state.filterBy)}
											onError={errors => console.log(errors)}
										>
											<TextValidator
												floatingLabelText="Search..."
												name="filterBy"
												value={this.state.filterBy}
												onChange={this.handleSearch.bind(this)}
												className="search-input-field"
											/>
										</ValidatorForm>
									</span>
								</div>
								<div className="col-sm-5 col-md-5 add-users float-right">
									<FlatButton
                    label="Add User"
                    labelStyle={{textTransform: 'capitalize', color: '#337ab7'}}
                    onTouchTap={ () => console.log('Begin adding a new user') }
                    className="float-right"
                  />
								</div>
							</div>
					</div>
					<div className='col-xs-12'>
						<Table striped id="">
							<thead>
								<tr>
									<th>Full Name</th>
									<th>Email</th>
									<th>Occupation</th>
									<th>Bio</th>
									<th> </th>
								</tr>
							</thead>
							<tbody id="userTable">
								{usersList.map((user, i) => {
									return(
										<tr key={i}>
											<td className="capitalize">{user.name}</td>
											<td>{user.email}</td>
											<td>{user.occupation}</td>
											<td>{user.bio}</td>
											<td>
											<Link to={`/user/${user.id}`} className="btn btn-primary">Edit</Link>
												 {/* <FlatButton
													label="Edit"
													labelStyle={{textTransform: 'capitalize', color: '#337ab7'}}
													onTouchTap={ () => console.log('Edit user') }
													className="float-right"/> */}
											</td>
										</tr>
									)}
								)}
							</tbody>
						</Table>
					</div>
				</div>				

		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		userActions: bindActionCreators(UserActions, dispatch),
	};
}

const mapStateToProps = (state) => {

	return {
		usersList: state.users.list,
		loader: state.users.loader,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
