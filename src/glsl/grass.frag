uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform float u_time;

varying vec2 v_uv;

float line(float x, float y, float line_width, float edge_width){
  return smoothstep(x-line_width/2.0-edge_width, x-line_width/2.0, y) - smoothstep(x+line_width/2.0, x+line_width/2.0+edge_width, y);
}

float brick(vec2 pt, float mortar_height, float edge_thickness){
  float result = line(0.0, pt.y, mortar_height, edge_thickness);
  result += line(1.0, pt.y, mortar_height, edge_thickness);
  result += line(0.5, pt.y, mortar_height, edge_thickness);

    if(pt.y < 0.5) pt.x = fract(pt.x + u_time);
    result += line(fract(pt.x - u_time), 0.5, mortar_height, edge_thickness);

  return result;
}

void main (void)
{
  vec2 uv = fract( v_uv * 10.0 );
  vec3 color = brick(uv, 0.05, 0.001) * vec3(1.0);
  gl_FragColor = vec4(color, 1.0); 
}