import { Link } from 'react-router'
import React from 'react'
import styled from 'styled-components'

const PostImage = ({ className = '', url = '', alt = '', to = '' }) => {
  if (to)
    return (
      <Link to={`/${to}`} style={{ display: 'inline-block' }}>
        <PostImageStyles className={`post-image ${className}`}>
          <img src={url} alt={alt} loading="lazy" />
        </PostImageStyles>
      </Link>
    )
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <img src={url} alt={alt} loading="lazy" />
    </PostImageStyles>
  )
}

const PostImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`

export default React.memo(PostImage)
