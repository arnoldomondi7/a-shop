import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const FooterComp = () => {
  //get new year from javascript.
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      {/* used to ensure that the items dont get 
    beside the browser */}
      <Container>
        {/* used to create a group of columns */}
        <Row>
          {/* lets you specify the columns widths accross 6 breakpoints sizes */}
          <Col className='text-center py-3'>
            <p>a-shop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default FooterComp
