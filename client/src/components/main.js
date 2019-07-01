import React from 'react';

const Main = () => {
  return (
    <main>
      <section className="intro">
        <h2>About Us</h2>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel
            gravida nisi. Vestibulum ac consequat lorem. In in mi massa. Donec
            ut tellus sit amet sem ornare fermentum at et nunc. Pellentesque ac
            elementum metus. Praesent non venenatis lacus. In sagittis urna in
            nulla sagittis mattis.
          </p>
        </div>
      </section>

      <div>
        <div className="services">
          <div className="service-one">
            <p className="service-icon">
              <i className="far fa-calendar-alt" />
            </p>
            <p className="service-title">Planning</p>
            <p>
              Mauris vitae turpis ut sem blandit consequat et at ligula.
              Suspendisse quam lectus, tristique dapibus sapien et, tempus
              suscipit nisl.
            </p>
          </div>
          <div className="service-two">
            <p className="service-icon">
              <i className="fas fa-crop" />
            </p>
            <p className="service-title">Design</p>
            <p>
              Nulla eu metus faucibus, vehicula tortor quis, venenatis odio.
              Nullam purus mauris, feugiat in odio vitae, posuere volutpat
              libero. Sed et convallis libero.
            </p>
          </div>
          <div className="service-three">
            <p className="service-icon">
              <i className="fas fa-code" />
            </p>
            <p className="service-title">Development</p>
            <p>
              Ut ornare vitae enim a rhoncus. Nullam aliquet tristique
              scelerisque. Sed volutpat dictum risus ac laoreet. Suspendisse id
              lorem in enim sollicitudin varius.
            </p>
          </div>
        </div>
      </div>

      <div className="gallery">
        <div className="gallery-item-one" />
        <div className="gallery-item-two" />
        <div className="gallery-item-three" />
        <div className="gallery-item-four" />
        <div className="gallery-item-five" />
        <div className="gallery-item-six" />
      </div>

      <section>
        <h2>Our Mission</h2>
        <div>
          <p>
            Integer sit amet venenatis erat. Cras elementum tortor odio, sit
            amet euismod nunc cursus ut. Donec sollicitudin orci sed enim
            volutpat, volutpat rutrum magna semper. Fusce leo lacus, pulvinar
            sit amet dignissim in, consectetur eget nulla. Etiam ac turpis
            augue. Sed tincidunt pulvinar tincidunt. Integer ac blandit magna.
            Nulla dapibus convallis luctus.{' '}
          </p>
          <p>
            Ut elementum urna sit amet elit egestas hendrerit. Vivamus quis sem
            fringilla, tincidunt nisi non, congue libero. Etiam cursus nulla
            quis sapien varius, eget accumsan augue mattis. Cras accumsan sapien
            nulla, eu eleifend odio tempus sit amet. Suspendisse gravida
            hendrerit sapien, ut molestie mi pellentesque eget. Aliquam eleifend
            velit vel libero elementum, vitae consectetur nisl sollicitudin.
            Suspendisse volutpat fringilla vehicula.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Main;
