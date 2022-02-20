import React, {useEffect, useState} from "react"
import { selectGistsError, selectGists } from "../../store/gist/selectors"
import { withGistsPage } from "../../HOCs/withGistsPage"
import { connect } from "react-redux"
import { Alert } from "../../components"
import styled from './GistsPage.module.scss'

export const GistsPage = (
    {
        getGistsUsers,
        gists,
        err,
        loading
    }) => {
       
    return(
        <div className={styled.GistsPage}>
            {
                  err &&
                  <div className={styled.GistsPage__ColdPageEndError}>
                        <Alert text={err} type="error"/>
                        <div className="coldPage">
                            <div className="coldPage__text">
                                <h2>No items in the page</h2>
                            </div>
                            <button
                                onClick={getGistsUsers}
                                className="Button primary">Refresh</button>
                        </div> 
                  </div>
            }
            {
                loading &&
                <div className="coldPage">
                    <p>Loadind...</p>
                </div>
            }
          <ul className={styled.GistsPage__CardList}>
              {
                gists &&  gists.map(elem => {
                      return (
                        <li
                            className={styled.GistsPage__CardList__Item}
                            key={elem.node_id}>
                            <img
                                className={styled.GistsPage__CardList__Item__Img}
                                src={elem.owner.avatar_url}
                                alt="avatr"/>
                            <p>{elem.owner.login}</p>
                        </li>
                      )
                  })
              }
              
          </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    gists: selectGists(state),
    err: selectGistsError(state)
})

export const GistPageEndReducer =  connect(mapStateToProps)(withGistsPage(GistsPage))

