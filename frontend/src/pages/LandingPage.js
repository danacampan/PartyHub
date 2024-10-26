import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Row,
  Col,
} from 'react-bootstrap';

export default function LandingPage() {
  return (
    <div>
      <div className="hero text-center landing-hero space-grotesk-normal text-white">
        <h1 className="space-grotesk normal ">
          Welcome to <h1 style={{ color: '#d115b5' }}>PartyHub!</h1>
        </h1>
        <p></p>
        <Button variant="light" href="#features">
          Get Started
        </Button>
      </div>

      <Container id="features" className="mt-5 space-grotesk-normal text-white">
        <h2 className="text-center space-grotesk normal ">Features</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="space-grotesk normal glow-border features-card">
              <Card.Body>
                <Card.Title>Add parties</Card.Title>
                <Card.Text className="text-secondary">
                  Plan your event effortlessly with our intuitive party creation
                  feature.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="space-grotesk normal glow-border  features-card">
              <Card.Body>
                <Card.Title>Manage party budget</Card.Title>
                <Card.Text className="text-secondary">
                  Keep your party within budget by tracking every expense.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="space-grotesk normal glow-border features-card">
              <Card.Body>
                <Card.Title>Shared responsibilities</Card.Title>
                <Card.Text className="text-secondary">
                  Organize seamlessly by assigning tasks and items to guests.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container id="about" className="mt-5">
        <h2 className="text-center space-grotesk-normal text-white">
          About Us
        </h2>
        <p className="text-center space-grotesk-normal text-white">
          At PartyHub, we believe that the best memories are made when people
          come together, which is why we’re dedicated to making event planning
          as easy and enjoyable as the event itself.
        </p>
      </Container>

      <footer
        className="space-grotesk-normal text-white text-center py-4 mt-5"
        style={{ backgroundColor: 'black' }}
      >
        <Container>
          <p>
            &copy; {new Date().getFullYear()} My Landing Page. All rights
            reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
