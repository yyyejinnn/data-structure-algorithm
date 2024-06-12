/**
 * P-NP
 * - 어떤 문제가 쉬운 문제인지? 어려운 문제인지? 판별하는 것
 * 
 * 결정 문제 (Decision Problem)
 * - yes/no로 대답할 수 있는 문제
 * 
 * 최적화 문제 (Optimization Problem)
 * - 최적의 해를 구하는 문제
 * - 대부분 최적화 문제 -> 결정 문제로 변경 가능.
 * 
 * * P 문제
 * - 결정론적 튜링 머신을 사용해 다항 시간 내에 답을 구할 수 있는 문제
 * -> 결정론적 튜링 머신..?
 *    - 현재 상태에서 다음 상태로 이동할 때 다음 상태가 유일하게 결정되는 머신
 *    - 일방향 문제 해결!
 *    
 *    다항 시간?
 *    - 문제 해결 시간이 다항 식으로 표현될 수 있는 것
 * 
 * - 우리가 푸는 대부분의 문제가 "P 문제"
 * 
 * * NP 문제
 * - 결정 문제가 주어졌을 때 비 결정론적 튜링 머신을 사용해 다항 시간 내 답을 구할 수 있는 문제
 * -> 즉, 결정론적 튜링 머신으로 다항 시간 내에 답을 구할 수 없는 문제! (검증은 가능 함)
 * -> 비결정론적 튜링 머신..?
 *    - 현재 상태에서 다음 상태로 넘어갈 때 다음 상태 갯수가 유일하지 않음
 * 
 * * NP-hard 문제
 * - 어떤 NP문제가 있을 때 모든 NP문제들을 다항 시간 내에 어떤 문제 A로 환원시킬 수 있다면, 그 A 문제
 * - 문제 해결 가능 여부도 알려지지 않는 문제 (가장 어려운 문제)
 * 
 * * NP-complete 문제
 * - NP-hard에도 포함되면서 NP에도 포함되는 문제
 * - 문제 해결은 가능하다고 알려진 문제 (해결 가능 문제 중 가장 어려움)
 * - ex. 외판원 문제(TSP)
 */