export interface Exercise {
  id: string;
  name: string;
  category: string;
  imagePath: string;
}

export const EXERCISES: Exercise[] = [
  // Back
  { id: 'back-fly', name: 'Back Fly', category: 'Back', imagePath: 'images_svg/Back/Back Fly.svg' },
  { id: 'bent-over-row', name: 'Bent-over Row', category: 'Back', imagePath: 'images_svg/Back/Bent-over Row.svg' },
  { id: 'bent-over-side-raise', name: 'Bent-over Side Raise', category: 'Back', imagePath: 'images_svg/Back/Bent-over Side Raise.svg' },
  { id: 'row', name: 'Row', category: 'Back', imagePath: 'images_svg/Back/Row.svg' },

  // Core
  { id: 'bicycle', name: 'Bicycle', category: 'Core', imagePath: 'images_svg/Core/Bicycle.svg' },
  { id: 'crunch', name: 'Crunch', category: 'Core', imagePath: 'images_svg/Core/Crunch.svg' },
  { id: 'kneeling-crunch', name: 'Kneeling Crunch', category: 'Core', imagePath: 'images_svg/Core/Kneeling Crunch.svg' },
  { id: 'reverse-crunch', name: 'Reverse Crunch', category: 'Core', imagePath: 'images_svg/Core/Reverse Crunch.svg' },
  { id: 'reverse-wood-chop', name: 'Reverse Wood Chop', category: 'Core', imagePath: 'images_svg/Core/Reverse Wood Chop.svg' },
  { id: 'russian-twist', name: 'Russian Twist', category: 'Core', imagePath: 'images_svg/Core/Russian Twist.svg' },
  { id: 'side-bend', name: 'Side Bend', category: 'Core', imagePath: 'images_svg/Core/Side Bend.svg' },
  { id: 'sit-up', name: 'Sit-up', category: 'Core', imagePath: 'images_svg/Core/Sit-up.svg' },
  { id: 'twist', name: 'Twist', category: 'Core', imagePath: 'images_svg/Core/Twist.svg' },

  // Lower Body
  { id: 'abduction', name: 'Abduction', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Abduction.svg' },
  { id: 'adduction', name: 'Adduction', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Adduction.svg' },
  { id: 'calf-extension', name: 'Calf Extension', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Calf Extension.svg' },
  { id: 'hamstring-curl', name: 'Hamstring Curl', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Hamstring Curl.svg' },
  { id: 'hip-flexor', name: 'Hip Flexor', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Hip Flexor.svg' },
  { id: 'leg-lift', name: 'Leg Lift', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Leg Lift.svg' },
  { id: 'lunge', name: 'Lunge', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Lunge.svg' },
  { id: 'pull-through', name: 'Pull Through', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Pull Through.svg' },
  { id: 'romanian-dead-lift', name: 'Romanian Dead Lift', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Romanian Dead Lift.svg' },
  { id: 'squat', name: 'Squat', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Squat.svg' },
  { id: 'standing-kickback', name: 'Standing Kickback', category: 'Lower Body', imagePath: 'images_svg/Lower Body/Standing Kickback.svg' },

  // Total Body
  { id: 'thruster', name: 'Thruster', category: 'Total Body', imagePath: 'images_svg/Total Body/Thruster.svg' },

  // Upper Body
  { id: '1-arm-lat-pulldown', name: '1 Arm Lat Pulldown', category: 'Upper Body', imagePath: 'images_svg/Upper Body/1 Arm Lat Pulldown.svg' },
  { id: 'chest-fly', name: 'Chest Fly', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Chest Fly.svg' },
  { id: 'curl', name: 'Curl', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Curl.svg' },
  { id: 'face-pull', name: 'Face Pull', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Face Pull.svg' },
  { id: 'front-side-raise', name: 'Front Side Raise', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Front Side Raise.svg' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Lat Pulldown.svg' },
  { id: 'lateral-extension', name: 'Lateral Extension', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Lateral Extension.svg' },
  { id: 'pulldown', name: 'Pulldown', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Pulldown.svg' },
  { id: 'push-up', name: 'Push-up', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Push-up.svg' },
  { id: 'shoulder-press', name: 'Shoulder Press', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Shoulder Press.svg' },
  { id: 'shoulder-rotation', name: 'Shoulder Rotation', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Shoulder Rotation.svg' },
  { id: 'standing-chest-press', name: 'Standing Chest Press', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Standing Chest Press.svg' },
  { id: 'tricep-kickback', name: 'Tricep Kickback', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Tricep Kickback.svg' },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Tricep Pushdown.svg' },
  { id: 'upright-row', name: 'Upright Row', category: 'Upper Body', imagePath: 'images_svg/Upper Body/Upright Row.svg' }
];
