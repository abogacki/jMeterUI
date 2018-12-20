import React from 'react';

const Content = props => (
    <React.Fragment>
        <div className="container">
            <div className="columns">
                <div className="column is-3 ">
                    <aside className="menu is-hidden-mobile">
                        <p className="menu-label">
                            General
                      </p>
                        <ul className="menu-list">
                            <li><a className="is-active">Dashboard</a></li>
                            <li><a>Customers</a></li>
                        </ul>
                        <p className="menu-label">
                            Administration
                      </p>
                        <ul className="menu-list">
                            <li><a>Team Settings</a></li>
                            <li>
                                <a>Manage Your Team</a>
                                <ul>
                                    <li><a>Members</a></li>
                                    <li><a>Plugins</a></li>
                                    <li><a>Add a member</a></li>
                                </ul>
                            </li>
                            <li><a>Invitations</a></li>
                            <li><a>Cloud Storage Environment Settings</a></li>
                            <li><a>Authentication</a></li>
                        </ul>
                        <p className="menu-label">
                            Transactions
                      </p>
                        <ul className="menu-list">
                            <li><a>Payments</a></li>
                            <li><a>Transfers</a></li>
                            <li><a>Balance</a></li>
                        </ul>
                    </aside>
                </div>
                <div className="column is-9">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="../">Bulma</a></li>
                            <li><a href="../">Templates</a></li>
                            <li><a href="../">Examples</a></li>
                            <li className="is-active"><a href="#" aria-current="page">Admin</a></li>
                        </ul>
                    </nav>
                    <section className="hero is-info welcome is-small">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Hello, Admin.
                              </h1>
                                <h2 className="subtitle">
                                    I hope you are having a great day!
                              </h2>
                            </div>
                        </div>
                    </section>
                    <section className="info-tiles">
                        <div className="tile is-ancestor has-text-centered">
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">439k</p>
                                    <p className="subtitle">Users</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">59k</p>
                                    <p className="subtitle">Products</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">3.4k</p>
                                    <p className="subtitle">Open Orders</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">19</p>
                                    <p className="subtitle">Exceptions</p>
                                </article>
                            </div>
                        </div>
                    </section>
                    <div className="columns">
                        <div className="column is-6">
                            <div className="card events-card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Events
                                  </p>
                                    <a href="#" className="card-header-icon" aria-label="more options">
                                        <span className="icon">
                                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </header>
                                <div className="card-table">
                                    <div className="content">
                                        <table className="table is-fullwidth is-striped">
                                            <tbody>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                                <tr>
                                                    <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                    <td>Lorum ipsum dolem aire</td>
                                                    <td><a className="button is-small is-primary" href="#">Action</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a href="#" className="card-footer-item">View All</a>
                                </footer>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Inventory Search
                                  </p>
                                    <a href="#" className="card-header-icon" aria-label="more options">
                                        <span className="icon">
                                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </header>
                                <div className="card-content">
                                    <div className="content">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input is-large" type="text" placeholder="" />
                                            <span className="icon is-medium is-left">
                                                <i className="fa fa-search"></i>
                                            </span>
                                            <span className="icon is-medium is-right">
                                                <i className="fa fa-check"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        User Search
                                  </p>
                                    <a href="#" className="card-header-icon" aria-label="more options">
                                        <span className="icon">
                                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </header>
                                <div className="card-content">
                                    <div className="content">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input is-large" type="text" placeholder="" />
                                            <span className="icon is-medium is-left">
                                                <i className="fa fa-search"></i>
                                            </span>
                                            <span className="icon is-medium is-right">
                                                <i className="fa fa-check"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
)

export default Content