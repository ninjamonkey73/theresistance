export interface Exercise {
  id: string;
  name: string;
  category: string;
  imagePath: string;
}

export const EXERCISES: Exercise[] = [
  // Back
  { id: 'back-fly', name: 'Back Fly', category: 'Back', imagePath: 'images/Back/Back Fly.png' },
  { id: 'bent-over-row', name: 'Bent-over Row', category: 'Back', imagePath: 'images/Back/Bent-over Row.png' },
  { id: 'bent-over-side-raise', name: 'Bent-over Side Raise', category: 'Back', imagePath: 'images/Back/Bent-over Side Raise.png' },
  { id: 'row', name: 'Row', category: 'Back', imagePath: 'images/Back/Row.png' },

  // Core
  { id: 'bicycle', name: 'Bicycle', category: 'Core', imagePath: 'images/Core/Bicycle.png' },
  { id: 'crunch', name: 'Crunch', category: 'Core', imagePath: 'images/Core/Crunch.png' },
  { id: 'kneeling-crunch', name: 'Kneeling Crunch', category: 'Core', imagePath: 'images/Core/Kneeling Crunch.png' },
  { id: 'reverse-crunch', name: 'Reverse Crunch', category: 'Core', imagePath: 'images/Core/Reverse Crunch.png' },
  { id: 'reverse-wood-chop', name: 'Reverse Wood Chop', category: 'Core', imagePath: 'images/Core/Reverse Wood Chop.png' },
  { id: 'russian-twist', name: 'Russian Twist', category: 'Core', imagePath: 'images/Core/Russian Twist.png' },
  { id: 'side-bend', name: 'Side Bend', category: 'Core', imagePath: 'images/Core/Side Bend.png' },
  { id: 'sit-up', name: 'Sit-up', category: 'Core', imagePath: 'images/Core/Sit-up.png' },
  { id: 'twist', name: 'Twist', category: 'Core', imagePath: 'images/Core/Twist.png' },

  // Lower Body
  { id: 'abduction', name: 'Abduction', category: 'Lower Body', imagePath: 'images/Lower Body/Abduction.png' },
  { id: 'adduction', name: 'Adduction', category: 'Lower Body', imagePath: 'images/Lower Body/Adduction.png' },
  { id: 'calf-extension', name: 'Calf Extension', category: 'Lower Body', imagePath: 'images/Lower Body/Calf Extension.png' },
  { id: 'hamstring-curl', name: 'Hamstring Curl', category: 'Lower Body', imagePath: 'images/Lower Body/Hamstring Curl.png' },
  { id: 'hip-flexor', name: 'Hip Flexor', category: 'Lower Body', imagePath: 'images/Lower Body/Hip Flexor.png' },
  { id: 'leg-lift', name: 'Leg Lift', category: 'Lower Body', imagePath: 'images/Lower Body/Leg Lift.png' },
  { id: 'lunge', name: 'Lunge', category: 'Lower Body', imagePath: 'images/Lower Body/Lunge.png' },
  { id: 'pull-through', name: 'Pull Through', category: 'Lower Body', imagePath: 'images/Lower Body/Pull Through.png' },
  { id: 'romanian-dead-lift', name: 'Romanian Dead Lift', category: 'Lower Body', imagePath: 'images/Lower Body/Romanian Dead Lift.png' },
  { id: 'squat', name: 'Squat', category: 'Lower Body', imagePath: 'images/Lower Body/Squat.png' },
  { id: 'standing-kickback', name: 'Standing Kickback', category: 'Lower Body', imagePath: 'images/Lower Body/Standing Kickback.png' },

  // Total Body
  { id: 'thruster', name: 'Thruster', category: 'Total Body', imagePath: 'images/Total Body/Thruster.png' },

  // Upper Body
  { id: '1-arm-lat-pulldown', name: '1 Arm Lat Pulldown', category: 'Upper Body', imagePath: 'images/Upper Body/1 Arm Lat Pulldown.png' },
  { id: 'chest-fly', name: 'Chest Fly', category: 'Upper Body', imagePath: 'images/Upper Body/Chest Fly.png' },
  { id: 'curl', name: 'Curl', category: 'Upper Body', imagePath: 'images/Upper Body/Curl.png' },
  { id: 'face-pull', name: 'Face Pull', category: 'Upper Body', imagePath: 'images/Upper Body/Face Pull.png' },
  { id: 'front-side-raise', name: 'Front Side Raise', category: 'Upper Body', imagePath: 'images/Upper Body/Front Side Raise.png' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'Upper Body', imagePath: 'images/Upper Body/Lat Pulldown.png' },
  { id: 'lateral-extension', name: 'Lateral Extension', category: 'Upper Body', imagePath: 'images/Upper Body/Lateral Extension.png' },
  { id: 'pulldown', name: 'Pulldown', category: 'Upper Body', imagePath: 'images/Upper Body/Pulldown.png' },
  { id: 'push-up', name: 'Push-up', category: 'Upper Body', imagePath: 'images/Upper Body/Push-up.png' },
  { id: 'shoulder-press', name: 'Shoulder Press', category: 'Upper Body', imagePath: 'images/Upper Body/Shoulder Press.png' },
  { id: 'shoulder-rotation', name: 'Shoulder Rotation', category: 'Upper Body', imagePath: 'images/Upper Body/Shoulder Rotation.png' },
  { id: 'standing-chest-press', name: 'Standing Chest Press', category: 'Upper Body', imagePath: 'images/Upper Body/Standing Chest Press.png' },
  { id: 'tricep-kickback', name: 'Tricep Kickback', category: 'Upper Body', imagePath: 'images/Upper Body/Tricep Kickback.png' },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'Upper Body', imagePath: 'images/Upper Body/Tricep Pushdown.png' },
  { id: 'upright-row', name: 'Upright Row', category: 'Upper Body', imagePath: 'images/Upper Body/Upright Row.png' }
];
