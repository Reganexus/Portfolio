const container = document.getElementById("physics-container");

const { Engine, Render, World, Bodies, Events, Composite, Runner, Body } =
  Matter;

const engine = Engine.create();
engine.enableSleeping = true;
engine.gravity.y = 0.9;
engine.positionIterations = 10;
engine.velocityIterations = 8;
engine.constraintIterations = 4;
engine.timing.timeScale = 1;

const world = engine.world;
const runner = Runner.create();
Runner.run(runner, engine);

let activeBodies = [];
let floor, leftWall, rightWall, topWall;
let pointerBody = null;

const render = Render.create({
  element: container,
  engine: engine,
  options: {
    width: container.offsetWidth,
    height: container.offsetHeight,
    wireframes: false,
    background: "transparent",
  },
});

render.canvas.style.display = "block";

function setupBoundaries() {
  const bounds = container.getBoundingClientRect();

  // Remove existing walls if they exist
  if (floor) World.remove(world, [floor, leftWall, rightWall, topWall]);

  const wallStyle = {
    isStatic: true,
    render: {
      visible: true,
      fillStyle: "rgba(255, 0, 0, 1)",
      strokeStyle: "#000",
      lineWidth: 1,
    },
  };

  floor = Bodies.rectangle(
    bounds.width / 2,
    bounds.height - 1,
    bounds.width,
    5,
    wallStyle
  );

  topWall = Bodies.rectangle(
    bounds.width / 2,
    -30,
    bounds.width,
    60,
    wallStyle
  );

  leftWall = Bodies.rectangle(
    -30,
    bounds.height / 2,
    60,
    bounds.height,
    wallStyle
  );

  rightWall = Bodies.rectangle(
    bounds.width + 30,
    bounds.height / 2,
    60,
    bounds.height,
    wallStyle
  );

  World.add(world, [floor, leftWall, rightWall, topWall]);
}

window.addEventListener("resize", () => {
  setupBoundaries();
  resetPhysics();
  applyPhysicsToActiveStack(); // Reapply current balls to new boundaries
});

Events.on(engine, "afterUpdate", () => {
  Composite.allBodies(world).forEach((body) => {
    if (body.el) {
      const angleDeg = (body.angle * 180) / Math.PI;
      body.el.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
      body.el.style.left = `${body.position.x}px`;
      body.el.style.top = `${body.position.y}px`;
    }
  });
});

function resetPhysics() {
  activeBodies.forEach((body) => {
    World.remove(world, body);
  });
  activeBodies = [];
}

function applyPhysicsToActiveStack() {
  const activeStack = document.querySelector(".stack-container > div.active");
  if (!activeStack) return;

  const bounds = container.getBoundingClientRect();
  const balls = activeStack.querySelectorAll(".ball");

  balls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const radius = rect.width / 2;
    const x = rect.left - bounds.left + radius + (Math.random() - 0.5) * 10;
    const y = rect.top - bounds.top + radius;

    const ball = Bodies.circle(x, y, radius, {
      restitution: 0.4,
      friction: 0.1,
      frictionAir: 0.015,
      density: 0.002,
    });

    el.style.left = `${x - radius}px`;
    el.style.top = `${y - radius}px`;
    el.style.position = "absolute";

    ball.el = el;
    World.add(world, ball);
    activeBodies.push(ball);

    if (Math.random() < 0.5) {
      Body.setAngularVelocity(ball, (Math.random() - 0.5) * 0.2);
      Body.applyForce(ball, ball.position, { x: 0, y: 0.002 });
    }
  });
}

function resetAndApplyPhysics() {
  resetPhysics();
  setupBoundaries(); // optional but recommended if dimensions might change
  applyPhysicsToActiveStack();
}

function createPointer(x, y) {
  if (pointerBody) return;

  pointerBody = Bodies.circle(x, y, 25, {
    isStatic: false,
    mass: 1,
    sleepThreshold: 120,
    render: {
      visible: false,
    },
  });

  Body.setMass(pointerBody, 5);

  World.add(world, pointerBody);
}

function movePointer(x, y) {
  if (pointerBody) {
    const dx = x - pointerBody.position.x;
    const dy = y - pointerBody.position.y;

    const maxSpeed = 10; // prevent crazy forces
    const vx = Math.max(Math.min(dx * 0.7, maxSpeed), -maxSpeed);
    const vy = Math.max(Math.min(dy * 0.7, maxSpeed), -maxSpeed);

    Body.setVelocity(pointerBody, { x: vx, y: vy });
  }
}

function removePointer() {
  if (pointerBody) {
    World.remove(world, pointerBody);
    pointerBody = null;
  }
}

function resetBallStyles() {
  const allBalls = container.querySelectorAll(".ball");
  allBalls.forEach((el) => {
    el.style.position = "";
    el.style.left = "";
    el.style.top = "";
    el.style.transform = "";
  });
}

container.addEventListener("mouseenter", (e) => {
  const bounds = container.getBoundingClientRect();
  const x = e.clientX - bounds.left;
  const y = e.clientY - bounds.top;
  createPointer(x, y);
});

container.addEventListener("mousemove", (e) => {
  const bounds = container.getBoundingClientRect();
  const x = e.clientX - bounds.left;
  const y = e.clientY - bounds.top;
  movePointer(x, y);
});

container.addEventListener("mouseleave", () => {
  removePointer();
});

setupBoundaries();
applyPhysicsToActiveStack();
