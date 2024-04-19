/**
 * 하노의의 탑 (재귀)
 */

hanoi(3, 'A', 'C', 'B');

function hanoi(count, from, to, temp) {
  if (count === 0) {
    return;
  }

  hanoi(count - 1, from, temp, to);
  console.log(`${count}번째 원반 ${from}에서 ${to}로 이동`);
  hanoi(count - 1, temp, to, from);
}
