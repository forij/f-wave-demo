varying vec2 v_uv;
void main() {	
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 2.0 );
}