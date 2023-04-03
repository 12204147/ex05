import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(1);

  const getPosts = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setLast(Math.ceil(json.length / 10));
        let start = (page - 1) * 10 + 1;
        let end = (page * 10);
        setPosts(json.filter(post => post.id >= start && post.id <= end));
        //setLast(Math.ceil(json.length / 5));
        setLoading(false);
      })
  }
  useEffect(() => {
    getPosts();
  }, [page]);

  if (loading) return <h1 className='text-center my-5'>로딩중입니다....</h1>
  return (
    <Container>
      <Row className='justify-content-center mx-3'>
        <Col md={10}>
          <h1 className='text-center my-5'>게시글</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>ID.</td>
                <td>Title</td>
              </tr>
            </thead>
            <tbody>
              {posts.map(post =>
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <div className='ellipsis'>{post.title}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <div class='text-center py-3'>
            <Button disabled={page === 1 && true}
            onClick={() => setPage(page - 1)}>이전</Button>
            <span class='mx-3'>{page} / {last}</span>
            <Button disabled={page === last && true}
            onClick={() => setPage(page + 1)}>다음</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PostsPage