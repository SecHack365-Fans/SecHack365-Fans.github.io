import React from 'react'
import { Link } from 'gatsby'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'

const headerComponent = () => {
  require('../components/header.css')
  return (
    <header className="bg-dark">
      <Container>
        <Navbar expand="md" variant="dark">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <Navbar.Toggle aria-controls="navbarResponsive" />
          <Navbar.Collapse id="navbarResponsive" className="mr-auto">
            <Nav as="ul" className="mr-auto">
              <Nav.Item as="li">
                <Link to="/2020/blog" className="nav-link">
                  参加記ブログ
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/timer/" className="nav-link">
                  †締切駆動コース†
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/ctf/" className="nav-link">
                  TsukuCTF
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <a
                  className="nav-link"
                  href="https://github.com/SecHack365-Fans/SecHack365-Fans.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repository
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 1 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  )
}

export default headerComponent
