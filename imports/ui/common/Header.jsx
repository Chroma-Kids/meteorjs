import React from 'react';
// import { connect } from 'react-redux';
// import { smoothlyMenu } from '../layouts/Helpers';
// import { logout } from '../../redux/actions/UserActions';

export class Header extends React.Component {

    // toggleNavigation(e) {
    //     e.preventDefault();
    //     // $("body").toggleClass("mini-navbar");
    //     // smoothlyMenu();
    // }
    //
    // state = {
    //   isClicked: true,
    // };

    render() {
      // const { isClicked } = this.state;
      // let someElementClass = isClicked ? 'mini-navbar' : '';

      return (
        <div className="row border-bottom">
            <nav className="navbar navbar-static-top white-bg m-b-none">
                {/*<div className="navbar-header">
                    <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars"></i> </a>
                </div>*/}
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <a onClick={() => {this.props.logout()}}>
                            <i className="fa fa-sign-out"></i> Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
      )
    }
}

// export default connect(null, { logout })(TopHeader)
